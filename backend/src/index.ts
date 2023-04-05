import { Router } from "express";

const QuizRouter = require('./routes/quiz')
const router = Router()

router.use('/quiz',QuizRouter)

export const indexRouter: Router = router