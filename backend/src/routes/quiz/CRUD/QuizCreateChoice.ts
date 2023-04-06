import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendTemplate, Code } from "../../../methods/template";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import * as crypto from "crypto";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();
export const QuizCreateChoiceRouter: Router = Router();

QuizCreateChoiceRouter.post(
  "/create_choice",
  body("questionID").isString(),
  body("content").isString(),
  body("is_correct").isBoolean(),
  (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }
    next();
  },
  async (req: Request, res: Response, next) => {
    const checkQuestion = prisma.question
      .findUnique({
        where: {
          id: req.body.questionID,
        },
      })
      .catch((e) => {
        console.log(e);
        res.status(Code.S400_Bad_Request).send(sendTemplate("bad request"));
      })
      .then((data) => {
        if (data != null) {
          next();
        } else {
          res
            .status(Code.s404_Not_Found)
            .send(sendTemplate("Question id doesn't exist"));
        }
      });
  },
  async (req: Request, res: Response, next) => {
    const createChoice = await prisma.choice
      .create({
        data: {
          questionId: req.body.questionID,
          content: req.body.content,
          is_correct: req.body.is_correct,
        },
      })
      .catch((e) => {
        console.log(e);
        res.status(Code.S400_Bad_Request).send(sendTemplate("Bad Request"));
      })
      .then((data) => {
        const senddata = {
          message: "Choice successfuly made",
          isCreated: true,
        };
        res.send(sendTemplate(senddata));
      });
  }
);
