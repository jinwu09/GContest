import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Code, sendTemplate } from "../../methods/template";
export const usersRouter: Router = Router();

const prisma = new PrismaClient();

usersRouter.get("/test", async (req: Request, res: Response) => {
  res.send("testing users/test");
});

usersRouter.post("/register", async (req: Request, res: Response) => {
  interface user {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
  }
  const data: user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  const createUser = await prisma.users
    .create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        school: req.body.school == null ? req.body.school : null,
        email: data.email,
        password: data.password,
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
});
