import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendTemplate, Code } from "../methods/template";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import * as crypto from "crypto";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
export const LoginAuthRouter: Router = Router();

LoginAuthRouter.use(
  body("token").isString(),
  async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }
    const API_KEY: string = process.env.API_KEY || "secret";

    try {
      res.locals.checktoken = jwt.verify(req.body.token, API_KEY);
      next();
    } catch (error) {
      res.status(Code.S400_Bad_Request).send(sendTemplate("invalid token"));
    }
  },
  async (req: Request, res: Response, next) => {
    const creatorID = await prisma.token
      .findUnique({
        where: {
          token: res.locals.checktoken.token,
        },
        select: {
          usersId: true,
        },
      })
      .catch((e) => {
        res.status(Code.S400_Bad_Request).send(sendTemplate("Bad Request "));
      })
      .then((data: any) => {
        if (data != null) {
          res.locals.userID = data.usersId;
          next();
        } else {
          const senddata = {
            message: "token doesn't exist",
            istoken: false,
          };
          res.status(Code.s404_Not_Found).send(sendTemplate(senddata));
        }
      });
  }
);
