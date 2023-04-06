import { Router } from "express";

import { QuizRouter } from "./routes/quiz";
// const QuizRouter = require('./routes/quiz')
const router = Router()

router.use('/quiz', QuizRouter)

export const indexRouter: Router = router