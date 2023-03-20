import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Code, sendTemplate } from "../../methods/template";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { validationResult } from "express-validator";
import * as crypto from "crypto";
// import * as jwt from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const usersRouter: Router = Router();

const prisma = new PrismaClient();

var CryptoJS = require("crypto-js");

usersRouter.get("/test", async (req: Request, res: Response) => {
  res.send("testing users/test");
});

usersRouter.post(
  "/register",
  body("first_name").isString(),
  body("last_name").isString(),
  body("username").isString(),
  body("email").isString().isEmail(),
  body("password").isString(),

  async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }
    const validateEmail = await prisma.users
      .findUnique({
        where: { email: req.body.email },
      })
      .then((email) => {
        if (email?.email == null) {
          next();
        } else {
          res.send(sendTemplate("Email Already Exist!"));
        }
      });
  },
  async (req: Request, res: Response, next) => {
    const createUser = await prisma.users

      .create({
        data: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          school: req.body.school == null ? req.body.school : null,
          email: req.body.email,
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.API_KEY
          ).toString(),
        },
      })

      .catch((e) => {
        console.log("from create user");
        console.log(e);
        res
          .status(Code.S400_Bad_Request)
          .send(sendTemplate("missing credential"));
      })
      .then((data: any) => {
        res.locals.userID = data.id;
        next();
      });
  },
  async (req: Request, res: Response, next) => {
    const createtoken = await prisma.token
      .create({
        data: {
          usersId: res.locals.userID,
        },
      })
      .catch((e) => {
        console.log(e);
        res.status(Code.S400_Bad_Request).send(sendTemplate("bad request"));
      })
      .then(() => {
        res.send(sendTemplate("successfully created user"));
      })
      .finally(() => {
        prisma.$disconnect();
      });
  }
);

usersRouter.post(
  "/login",
  body("email").isString().isEmail(),
  body("password").isString(),
  async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }

    const LoginUser = await prisma.users
      .findUnique({
        where: { email: req.body.email },
        select: { id: true, password: true },
      })
      .catch((e) => {
        console.log(e);
        res.status(Code.S400_Bad_Request).send(sendTemplate("Bad Request"));
      })
      .then((data) => {
        if (
          CryptoJS.AES.decrypt(data?.password, process.env.API_KEY).toString(
            CryptoJS.enc.Utf8
          ) == req.body.password
        ) {
          res.locals.userID = data?.id;
          next();
        } else {
          res
            .status(Code.s401_Unauthorized)
            .send(sendTemplate("Wrong email or password"));
        }
      })
      .finally(() => {
        prisma.$disconnect();
      });
  },
  async (req: Request, res: Response) => {
    const gentoken = crypto.randomUUID();
    const API_KEY: string = process.env.API_KEY || "secret";
    const jwtoken = jwt.sign({ token: gentoken }, API_KEY);
    const updateToken = await prisma.token
      .update({
        where: {
          usersId: res.locals.userID,
        },
        data: { token: gentoken },
      })
      .catch((e) => {
        console.log(e);
        res.status(Code.S400_Bad_Request).send(sendTemplate("bad request "));
      })
      .then(() => {
        res.send(
          sendTemplate({
            message: "successfully logged-in user",
            jwtoken: jwtoken,
          })
        );
      })
      .finally(() => {
        prisma.$disconnect();
      });
  }
);
