import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { QuizUpdateRouter } from "./CRUD/QuizUpdate";
import { QuizAuthRouter } from "./CRUD/QuizAuth";
import { QuizReadRouter } from "./CRUD/QuizRead";
import { QuizCreateRouter } from "./CRUD/QuizCreate";
export { SocketListener } from "./QuizSocketIndex";

const prisma = new PrismaClient();
export const QuizRouter: Router = Router();

QuizRouter.use(QuizAuthRouter);

QuizRouter.use(QuizCreateRouter);
QuizRouter.use(QuizReadRouter);
QuizRouter.use(QuizUpdateRouter);

QuizRouter.get(
  "/test",
  (req: Request, res: Response, next) => {
    console.log("hello");
    res.send("Sendd");
    next();
  },
  (req: Request, res: Response) => {
    console.log("2nd nexxt");
  }
);
