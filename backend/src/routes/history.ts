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
    orderBy: {
      quizSessionId: "desc",
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
              score: true,
            },
          },
          answer: {
            where: {
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
            },
          },
        },
      })
      .then(async (data) => {
        console.log(data);
        let QuizScore: number = 0;
        let UserScore: number = 0;
        data?.question.forEach((item) => {
          QuizScore += item.score;
        });
        data?.answer.forEach((item) => {
          UserScore += item.Question.score;
        });
        return { id: data?.id, title: data?.title, QuizScore, UserScore };
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
                answer: true,
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
  "/creator/:quizID",
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
    let getQuizHistory: any[] = [];

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
      const data = {
        Session: item.quizSessionId,
        totalScore: getScoreTotal,
      };
      getQuizHistory.push(data);
    }
    res.status(Code.s200_OK).send(sendTemplate(getQuizHistory, Code.s200_OK));
  }
);
router.get("/creator", async (req: Request, res: Response) => {
  const groupSession = await prisma.answer.groupBy({
    by: ["quizSessionId"],
    where: {
      Quiz: {
        creator_id: res.locals.userId,
      },
    },
    orderBy: {
      quizSessionId: "desc",
    },
  });
  let getQuizHistory: any[] = [];

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
    const data = {
      Session: item.quizSessionId,
      totalScore: getScoreTotal,
    };
    getQuizHistory.push(data);
  }
  console.log(getQuizHistory);
  res.status(Code.s200_OK).send(sendTemplate(getQuizHistory, Code.s200_OK));
});
export const HistoryRouter: Router = router;
