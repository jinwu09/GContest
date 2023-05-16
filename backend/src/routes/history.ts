import { Router, Request, Response } from "express";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { sendTemplate, Code } from "../methods/template";
import { group } from "console";
import { send } from "process";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const groupSession = await prisma.answer.groupBy({
    by: ["quizSessionId"],
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
router.get("/:quizID", async (req: Request, res: Response) => {
  const groupSession = await prisma.answer.groupBy({
    by: ["quizSessionId"],
    where: {
      quizId: Number(req.params.quizID),
    },
  });
  // let getQuizHistory: any[] = [];

  // for (const item of groupSession) {
  //   const QuizSession = await prisma.quiz
  //     .findFirst({
  //       where: {
  //         answer: {
  //           some: {
  //             quizSessionId: item.quizSessionId,
  //           },
  //         },
  //       },
  //       select: {
  //         id: true,
  //         title: true,
  //         question: {
  //           select: {
  //             score: true,
  //           },
  //         },
  //         answer: {
  //           where: {
  //             quizSessionId: item.quizSessionId,
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
  //           },
  //         },
  //       },
  //     })
  //     .then(async (data) => {
  //       console.log(data);
  //       let QuizScore: number = 0;
  //       let UserScore: number = 0;
  //       data?.question.forEach((item) => {
  //         QuizScore += item.score;
  //       });
  //       data?.answer.forEach((item) => {
  //         UserScore += item.Question.score;
  //       });
  //       return { id: data?.id, title: data?.title, QuizScore, UserScore };
  //     });
  //   getQuizHistory.push(QuizSession);
  // }
  res.status(Code.s200_OK).send(sendTemplate(groupSession, Code.s200_OK));
});

export const HistoryRouter: Router = router;
