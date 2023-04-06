import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendTemplate, Code } from "../../../methods/template";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import * as crypto from "crypto";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();
export const QuizCreateQuizRouter: Router = Router();

QuizCreateQuizRouter.post(
  "/create_quiz",
  body("title").isString().isLength({ min: 1 }),
  body("status").isString(),
  body("room").isString(),
  body("start_at").isString(),
  body("ends_at").isString(),
  async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }

    const checkRoom = await prisma.quiz
      .findUnique({
        where: {
          room: req.body.room,
        },
        select: {
          room: true,
        },
      })
      .then((room) => {
        if (room != null) {
          res
            .status(Code.S400_Bad_Request)
            .send(sendTemplate("rooms is already exist"));
        } else {
          next();
        }
      });
  },
  async (req: Request, res: Response, next) => {
    console.log({
      from: "create quiz",
      LocalUserID: res.locals.userID,
    });
    const checkCreator = prisma.users
      .findUnique({
        where: {
          id: res.locals.userID,
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
            .send(sendTemplate("creator doesn't exist"));
        }
      });
  },
  async (req: Request, res: Response) => {
    const createquiz = await prisma.quiz
      .create({
        data: {
          title: req.body.title,
          password: req.body.password,
          room: req.body.room || crypto.randomUUID(),
          status: req.body.status,
          creator_id: res.locals.userID,
          start_at: new Date(req.body.start_at),
          ends_at: new Date(req.body.ends_at),
        },
      })
      .catch((e) => {
        console.log(e);
        res
          .status(Code.S400_Bad_Request)
          .send(sendTemplate("Bad Request", Code.S400_Bad_Request));
      })
      .finally(async () => {
        await prisma.$disconnect();
      })
      .then(() => {
        res
          .status(Code.s201_Created)
          .send(sendTemplate("quiz created", Code.s201_Created));
      });
  }
);
