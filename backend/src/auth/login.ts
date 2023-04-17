import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Code, sendTemplate } from "../methods/template";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { validationResult } from "express-validator";
import * as crypto from "crypto";
import { tokenChecker } from "../middlewares/checktoken";
// import * as jwt from "jsonwebtoken";
import jwt from "jsonwebtoken";

const router = Router();

export const AuthRouter: Router = router;

const prisma = new PrismaClient();

var CryptoJS = require("crypto-js");

router.post(
  "/register",
  body("firstName").isString(),
  body("lastName").isString(),
  body("email").isString().isEmail(),
  body("password").isString(),
  body("confirm_password").isString(),

  async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }
    const validateEmail = await prisma.user
      .findUnique({
        where: { email: req.body.email },
      })
      .then((email) => {
        if (email?.email == null) {
          if (req.body.password === req.body.confirm_password) {
            next();
          } else {
            return res.send(sendTemplate("Passwords doesnt match."));
          }
        } else {
          return res.send(sendTemplate("Email Already Exist!"));
        }
      });
  },
  async (req: Request, res: Response, next) => {
    const createUser = await prisma.user
      .create({
        data: {
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          school: req.body.school != null ? req.body.school : null,
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
        return res
          .status(Code.S400_Bad_Request)
          .send(sendTemplate("Error in user creation"));
      })
      .then((data: any) => {
        res.locals.userID = data.id;
        // res
        // .status(Code.s200_OK)
        // .send(sendTemplate("User succesfully registered! Login to continute"));
        next();
      });
  },
  async (req: Request, res: Response) => {
    const gentoken = crypto.randomUUID();
    const API_KEY: string = process.env.API_KEY || "secret";
    const jwtoken = jwt.sign({ token: gentoken }, API_KEY);
    const LoginUser = await prisma.token
      .create({
        data: {
          usersId: res.locals.userID,
          token: jwtoken,
        },
      })
      .then((data: any) => {
        res.send(
          sendTemplate({
            message: "User succesfully created!",
            token: jwtoken,
          })
        );
      });
  }
);

router.post(
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

    const LoginUser = await prisma.user
      .findUnique({
        where: { email: req.body.email },
        select: { id: true, password: true },
      })
      .catch((e) => {
        return res
          .status(Code.S400_Bad_Request)
          .send(sendTemplate("Bad Request"));
      })
      .then((data: any) => {
        if (
          CryptoJS.AES.decrypt(data?.password, process.env.API_KEY).toString(
            CryptoJS.enc.Utf8
          ) === req.body.password
        ) {
          res.locals.userID = data?.id;
          next();
        } else {
          return res
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
    console.log("Hello " + res.locals.userID);
    const createToken = await prisma.token
      .create({
        data: {
          token: jwtoken,
          usersId: res.locals.userID,
        },
      })
      .catch((e) => {
        console.log(e);
        return res.send(sendTemplate("bad request "));
      })
      .then(() => {
        return res.send(
          sendTemplate({
            message: "You're logged in!",
            token: jwtoken,
          })
        );
      })
      .finally(() => {
        prisma.$disconnect();
      });
  }
);

router.post("/logout", tokenChecker, async (req: Request, res: Response) => {
  const tokenDelete = await prisma.token
    .delete({
      where: { token: res.locals.token },
    })
    .then((data) => {
      return res.send(sendTemplate("Successfully Logged out!"));
    })
    .finally(() => {
      prisma.$disconnect();
    });
});
