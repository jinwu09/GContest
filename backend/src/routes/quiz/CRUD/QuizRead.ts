import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendTemplate, Code } from "../../../methods/template";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { validationResult } from "express-validator";
import * as crypto from "crypto";

const prisma:any = new PrismaClient();
export const QuizReadRouter: Router = Router();

QuizReadRouter.get(
  "/show_quizes",
  async (req: Request, res: Response, next) => {
    const showQuiz = await prisma.quiz
      .findMany({
        include: {
          question: {
            include: {
              choice: true,
            },
          },
        },
      })
      .catch((e:any) => {
        console.log(e);
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    res.status(Code.s200_OK).send(sendTemplate(showQuiz));
  }
);

QuizReadRouter.post(
  "/quiz_detail",
  body("quizID").isString(),
  async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }

    const quiz_detail = await prisma.quiz
      .findUnique({
        where: {
          id: req.body.quizID,
        },
        include: {
          question: true,
        },
      })
      .catch((e:any) => {
        console.log(e);
      })
      .then((data:any) => {
        res.send(sendTemplate(data));
      })
      .finally(async () => {
        await prisma.$disconnect;
      });
  }
);

QuizReadRouter.get(
  "/user_created_quiz",
  async (req: Request, res: Response) => {
    const user_created_quiz = await prisma.quiz
      .findMany({
        where: {
          creator_id: res.locals.userID,
        },
        select: {
          id: true,
          room: true,
          title: true,
          start_at: true,
          ends_at: true,
        },
      })
      .catch((e:any) => {
        console.log(e);
      })
      .then((data:any) => {
        res.send(sendTemplate(data));
      })
      .finally(async () => {
        await prisma.$disconnect;
      });
  }
);

QuizReadRouter.get("/user_recent_quiz", async (req: Request, res: Response) => {
  const recent_quiz : any = await prisma.answeredQuiz
    .findMany({
      where: {
        usersId: res.locals.userID,
      },
      select: {
        Score: true,
        created_at: true,
        Quiz: {
          select: {
            title: true,
          },
        },
      },
    })
    .catch((e :any) => {
      console.log(e);
    })
    .then((data:any) => {
      res.send(sendTemplate(data));
    })
    .finally(async () => {
      await prisma.$disconnect;
    });
  console.log(recent_quiz);
});
