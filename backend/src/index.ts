import { Router } from "express";

import { QuizRouter } from "./routes/quiz";
import { AuthRouter } from "./auth/login";
import { tokenChecker } from "./middlewares/checktoken";
import { QuestionRouter } from "./routes/question";
// const QuizRouter = require('./routes/quiz')
const router = Router();

router.use("/question", tokenChecker, QuestionRouter);
router.use("/quiz", tokenChecker, QuizRouter);
router.use("/auth", AuthRouter);

export const indexRouter: Router = router;
