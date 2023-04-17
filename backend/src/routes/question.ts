import { Router, Request, Response } from "express";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { sendTemplate, Code } from "../methods/template";


const prisma = new PrismaClient();
const router = Router()

router.get('/:question_id',
    async (req: Request, res: Response) => {
        const getQuestion = await prisma.question
            .findUnique({
                where: {
                    id: parseInt(req.params.question_id)
                },
                include: {
                    choice: true
                }
            }).then((data: any) => {
                res.send(sendTemplate(data)).status(200)
            }).catch((err) => {
                res.send(sendTemplate(err)).status(200)
            }).finally(async () => {
                await prisma.$disconnect;
            })
    }
)

router.post('/',
    body("content").isString().isLength({ min: 1 }),
    body("score").isNumeric(),
    body("quizId").isNumeric(),
    body("choices").isArray(),
    async (req: Request, res: Response) => {
        const createQuestion = await prisma.question
            .create(
                {
                    data: {
                        content: req.body.content,
                        score: req.body.score,
                        quizId: req.body.quizId,
                        choice: {
                            createMany: {
                                data: [
                                    {
                                        content: req.body.choices[0].content,
                                        is_correct: req.body.choices[0].is_correct
                                    },
                                    {
                                        content: req.body.choices[1].content,
                                        is_correct: req.body.choices[1].is_correct
                                    },
                                    {
                                        content: req.body.choices[1].content,
                                        is_correct: req.body.choices[1].is_correct
                                    },
                                    {
                                        content: req.body.choices[1].content,
                                        is_correct: req.body.choices[1].is_correct
                                    },
                                ]
                            }
                        }
                    },
                }
            ).then((data:any)=>{
                res.send(sendTemplate({message: "Successfully created!"})).status(Code.s200_OK)
            }).catch((err: any)=>{
                res.send(sendTemplate({message: "Error in createting question"})).status(Code.S400_Bad_Request)
            }).finally(async () => {
                await prisma.$disconnect;
            })
    }
)

export const QuestionRouter: Router = router
