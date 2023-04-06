import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendTemplate, Code } from "../../../methods/template";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import * as crypto from "crypto";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();
export const QuizCreateQuestionRouter: Router = Router();

QuizCreateQuestionRouter.post(
  "/create_question",
  body("content").isString(),
  body("score").isNumeric(),
  body("quizID").isString(),
  async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }
    next();
  },
  async (req: Request, res: Response, next) => {
    const checkQuiz = await prisma.quiz
      .findUnique({
        where: {
          id: req.body.quizID,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        if (data != null) {
          next();
        } else {
          res
            .status(Code.s404_Not_Found)
            .send(sendTemplate("quizID not found "));
        }
      })
      .finally(() => {
        prisma.$disconnect();
      });
  },
  async (req: Request, res: Response, next) => {
    const createQuestion = await prisma.question
      .create({
        data: {
          content: req.body.content,
          score: req.body.score,
          quizId: req.body.quizID,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        console.log(data);
        res.send(sendTemplate({ message: "successfully made" }));
      })
      .finally(async () => {
        await prisma.$disconnect;
      });
    console.log("hello");
    console.log(createQuestion);
  }
);
