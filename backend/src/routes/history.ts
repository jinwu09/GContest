import { Router, Request, Response } from "express";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { PrismaClient } from "@prisma/client";
import { param, validationResult } from "express-validator";
import { sendTemplate, Code } from "../methods/template";
import { Validate } from "../middlewares/validator";

const prisma = new PrismaClient();
const router = Router();

router.get("/joined", async (req: Request, res: Response) => {
  const groupSession = await prisma.answer.groupBy({
    by: ["quizSessionId"],
    where: {
      usersId: res.locals.userId,
    },
    orderBy: {
      quizSessionId: "desc",
    },
  });
  console.log(groupSession);
  let getUserHistory: any[] = [];

  for (const item of groupSession) {
    const QuizSession = await prisma.quiz
      .findFirst({
        where: {
          answer: {
            some: {
              quizSessionId: item.quizSessionId,
            },
          },
        },
        select: {
          id: true,
          title: true,
          description: true,
          question: {
            select: {
              score: true,
            },
          },
          answer: {
            where: {
              usersId: res.locals.userId,
              quizSessionId: item.quizSessionId,
              choice: {
                is_correct: true,
              },
            },
            select: {
              Question: {
                select: {
                  score: true,
                },
              },
              id: true,
            },
          },
        },
      })
      .then(async (data) => {
        console.log(data);
        let quiz_score: number = 0;
        let user_score: number = 0;
        data?.question.forEach((item) => {
          quiz_score += item.score;
        });
        data?.answer.forEach((item) => {
          user_score += item.Question.score;
        });
        return {
          quiz_id: data?.id,
          title: data?.title,
          description: data?.description,
          quiz_score,
          user_score,
        };
      });
    getUserHistory.push(QuizSession);
  }

  console.log(getUserHistory);
  res.status(Code.s200_OK).send(sendTemplate(getUserHistory, Code.s200_OK));
});
router.get(
  "/joined/:quizID",
  param("quizID").isNumeric(),
  Validate,
  async (req: Request, res: Response) => {
    const groupSession = await prisma.answer.groupBy({
      by: ["quizSessionId"],
      where: {
        usersId: res.locals.userId,
        quizId: Number(req.params.quizID),
      },
    });
    let getUserHistory: any[] = [];

    for (const item of groupSession) {
      const QuizSession = await prisma.quiz
        .findFirst({
          where: {
            answer: {
              some: {
                quizSessionId: item.quizSessionId,
              },
            },
          },
          select: {
            id: true,
            title: true,
            question: {
              select: {
                id: true,
                content: true,
                score: true,
                choice: true,
                answer: {
                  select: {
                    id: true,
                    choice: {
                      select: {
                        id: true,
                        content: true,
                        is_correct: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })
        .then(async (data) => {
          console.log(data);
          return data;
        });
      getUserHistory.push(QuizSession);
    }
    res.status(Code.s200_OK).send(sendTemplate(getUserHistory, Code.s200_OK));
  }
);
// router.get()
router.get(
  "/created/:quizID",
  param("quizID").isNumeric(),
  Validate,
  async (req: Request, res: Response) => {
    console.log(res.locals.userId);
    const groupSession = await prisma.answer.groupBy({
      by: ["quizSessionId"],
      where: {
        Quiz: {
          creator_id: res.locals.userId,
        },
        quizId: Number(req.params.quizID),
      },
      orderBy: {
        quizSessionId: "desc",
      },
    });
    let getQuizHistory: any = {};

    for (const item of groupSession) {
      const QuizSession = await prisma.user
        .findMany({
          where: {
            Answer: {
              some: {
                quizSessionId: Number(item.quizSessionId),
              },
            },
          },
          select: {
            id: true,
            first_name: true,
            last_name: true,
            Answer: {
              where: {
                quizSessionId: Number(item.quizSessionId),
                choice: {
                  is_correct: true,
                },
              },
              select: {
                Question: {
                  select: {
                    score: true,
                  },
                },
                choice: {
                  select: {
                    is_correct: true,
                  },
                },
              },
            },
          },
        })
        .then((data) => {
          console.log(data);
          return data;
        })
        .catch((e) => {
          console.log(e);
        });
      let getScoreTotal: any = [];
      QuizSession?.forEach((item) => {
        let obj = {
          id: item.id,
          first_name: item.first_name,
          last_name: item.last_name,
          score: 0,
        };
        item.Answer.forEach((item) => {
          if (item.choice?.is_correct == true) {
            obj.score += item.Question?.score;
          }
        });
        getScoreTotal.push(obj);
      });
      const GetQuizTotalScore = await prisma.quiz
        .findFirst({
          where: {
            id: Number(req.params.quizID),
          },
          select: {
            question: {
              select: {
                score: true,
              },
            },
          },
        })
        .then((data) => {
          let totalScore = 0;
          data?.question.forEach((item) => {
            totalScore += item.score;
          });
          return totalScore;
        });
      const data = {
        Session: item.quizSessionId,
        totalScore: GetQuizTotalScore,
        list: getScoreTotal,
      };
      getQuizHistory = data;
    }
    res.status(Code.s200_OK).send(sendTemplate(getQuizHistory, Code.s200_OK));
  }
);
router.get("/created", async (req: Request, res: Response) => {
  const user_created_quiz = await prisma.quiz
    .findMany({
      where: {
        creator_id: parseInt(res.locals.userId),
      },
      include: {
        creator: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        room: true,
      },
    })
    .catch((e: any) => {
      console.log(e);
    })
    .then((data: any) => {
      res.send(sendTemplate(data));
    })
    .finally(async () => {
      await prisma.$disconnect;
    });
  // const groupSession = await prisma.answer.groupBy({
  //   by: ["quizSessionId"],
  //   where: {
  //     Quiz: {
  //       creator_id: res.locals.userId,
  //     },
  //   },
  //   orderBy: {
  //     quizSessionId: "desc",
  //   },
  // });
  // let getQuizHistory: any[] = [];

  // for (const item of groupSession) {
  //   const QuizSession = await prisma.user
  //     .findMany({
  //       where: {
  //         Answer: {
  //           some: {
  //             quizSessionId: Number(item.quizSessionId),
  //           },
  //         },
  //       },
  //       select: {
  //         id: true,
  //         first_name: true,
  //         last_name: true,
  //         Answer: {
  //           where: {
  //             quizSessionId: Number(item.quizSessionId),
  //             choice: {
  //               is_correct: true,
  //             },
  //           },
  //           select: {
  //             Question: {
  //               select: {
  //                 score: true,
  //               },
  //             },
  //             choice: {
  //               select: {
  //                 is_correct: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     })
  //     .then((data) => {
  //       return data;
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   let getScoreTotal: any = [];
  //   QuizSession?.forEach((item) => {
  //     let obj = {
  //       id: item.id,
  //       first_name: item.first_name,
  //       last_name: item.last_name,
  //       score: 0,
  //     };
  //     item.Answer.forEach((item) => {
  //       if (item.choice?.is_correct == true) {
  //         obj.score += item.Question?.score;
  //       }
  //     });
  //     getScoreTotal.push(obj);
  //   });
  //   const data = {
  //     Session: item.quizSessionId,
  //     totalScore: getScoreTotal,
  //   };
  //   getQuizHistory.push(data);
  // }
  // console.log(getQuizHistory);
  // res.status(Code.s200_OK).send(sendTemplate(user_created_quiz, Code.s200_OK));
});
export const HistoryRouter: Router = router;
