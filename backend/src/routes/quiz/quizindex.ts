import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { QuizUpdateRouter } from "./CRUD/QuizUpdate";
import { LoginAuthRouter } from "../../auth/LoginAuth";
import { QuizReadRouter } from "./CRUD/QuizRead";
import { QuizCreateQuizRouter } from "./CRUD/QuizCreateQuiz";
import { QuizCreateQuestionRouter } from "./CRUD/QuizCreateQuestion";
import { QuizCreateChoiceRouter } from "./CRUD/QuizCreateChoice";
export { SocketListener } from "./QuizSocketIndex";

const prisma = new PrismaClient();
export const QuizRouter: Router = Router();

QuizRouter.use(LoginAuthRouter);

QuizRouter.use(QuizCreateQuizRouter);
QuizRouter.use(QuizCreateQuestionRouter);
QuizRouter.use(QuizCreateChoiceRouter);
QuizRouter.use(QuizReadRouter);
QuizRouter.use(QuizUpdateRouter);

QuizRouter.get("/test", (req: Request, res: Response, next) => {
  res.send("Sendd");
  next();
});
