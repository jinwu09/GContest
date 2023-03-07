import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Code, sendTemplate } from "../../methods/template";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { validationResult } from "express-validator";

export const usersRouter: Router = Router();

const prisma = new PrismaClient();

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
  async (req: Request, res: Response) => {
    const createUser = await prisma.users

      .create({
        data: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          school: req.body.school == null ? req.body.school : null,
          email: req.body.email,
          password: req.body.password,
        },
      })

      .catch((e) => {
        console.log("from create user");
        console.log(e);
        res
          .status(Code.S400_Bad_Request)
          .send(sendTemplate("missing credential"));
      })
      .then(() => {
        res.send(sendTemplate("successfully created user"));
      });
  }
);

usersRouter.post(
  "/login",
  body("email").isString().isEmail(),
  body("password").isString(),

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }

    const LoginUser = await prisma.users
      .findUnique({
        where: { email: req.body.email },
        select: { password: true },
      })
      .catch((e) => {
        console.log("from create user");
        console.log(e);
        res.status(Code.S400_Bad_Request).send(sendTemplate("Bad Request"));
      })
      .then((password) => {
        if (password?.password == req.body.password) {
          res.send(sendTemplate("successfully logged-in user"));
        } else {
          res
            .status(Code.s401_Unauthorized)
            .send(sendTemplate("Wrong email or password"));
        }
      });
  }
);
