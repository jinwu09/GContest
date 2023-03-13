import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendTemplate, Code } from "../../../methods/template";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { validationResult } from "express-validator";
import * as crypto from "crypto";

const prisma = new PrismaClient();
export const QuizUpdateRouter: Router = Router();

QuizUpdateRouter.post(
  "/questionDetails",
  body("score").isNumeric().optional(),
  body("content").isString().optional(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }
    const updateQuestionDetails = await prisma.question
      .update({
        where: {
          id: req.body.id,
        },
        data: {
          score: req.body.score,
          content: req.body.content,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        res.send(sendTemplate("Success"));
      })
      .finally(async () => {
        await prisma.$disconnect;
      });
  }
);
QuizUpdateRouter.post(
  "/update_quiz",
  async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }
    if (req.body.room != null) {
      const findExistingRoom = await prisma.quiz.findUnique({
        where: {
          room: req.body.room,
        },
      });
      if (findExistingRoom != null) {
        res.send(sendTemplate("Room already exist"));
      } else {
        next();
      }
    } else {
      next();
    }
  },
  async (req: Request, res: Response, next) => {
    const updateQuiz = await prisma.quiz
      .update({
        where: {
          id: req.body.quizID,
        },
        data: {
          room: req.body.room,
          password: req.body.password,
          status: req.body.status,
          ends_at: req.body.ends_at,
          start_at: req.body.start_at,
          title: req.body.title,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        res.send(sendTemplate("success"));
      })
      .finally(async () => {
        await prisma.$disconnect;
      });
  }
);
