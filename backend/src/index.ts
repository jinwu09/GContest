import { Router } from "express";

import { QuizRouter } from "./routes/quiz";
import { AuthRouter } from "./auth/login";
// const QuizRouter = require('./routes/quiz')
const router = Router()

router.use('/quiz', QuizRouter)
router.use('/auth', AuthRouter)

export const indexRouter: Router = router
