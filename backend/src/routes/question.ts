import { Router, Request, Response } from "express";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { sendTemplate, Code } from "../methods/template";

const prisma = new PrismaClient();
const router = Router();

router.get("/:question_id", async (req: Request, res: Response) => {
  const getQuestion = await prisma.question
    .findUnique({
      where: {
        id: parseInt(req.params.question_id),
      },
      include: {
        choice: true,
      },
    })
    .then((data: any) => {
      res.send(sendTemplate(data)).status(200);
    })
    .catch((err) => {
      res.send(sendTemplate(err)).status(200);
    })
    .finally(async () => {
      await prisma.$disconnect;
    });
});

router.post(
  "/",
  body("content").isString().isLength({ min: 1 }),
  body("score").isNumeric(),
  body("quizId").isNumeric(),
  async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }
    const createQuestion = await prisma.question
      .create({
        data: {
          content: req.body.content,
          score: parseInt(req.body.score),
          quizId: parseInt(req.body.quizId),
        },
      })
      .then((data: any) => {
        res.locals.question_id = data.id;
        next();
        // res.send(sendTemplate({message: "Successfully created!"})).status(Code.s200_OK)
      })
      .catch((err: any) => {
        console.log(err);
        res
          .send(sendTemplate({ message: "Error in creating question" }))
          .status(Code.S400_Bad_Request);
      })
      .finally(async () => {
        await prisma.$disconnect;
      });
  },
  async (req: Request, res: Response) => {
    const createChoice = await prisma.choice
      .createMany({
        data: [
          {
            content: req.body.choices[0].content,
            is_correct: req.body.choices[0].isCorrect,
            questionId: res.locals.question_id,
          },
          {
            content: req.body.choices[1].content,
            is_correct: req.body.choices[1].isCorrect,
            questionId: res.locals.question_id,
          },
          {
            content: req.body.choices[2].content,
            is_correct: req.body.choices[2].isCorrect,
            questionId: res.locals.question_id,
          },
          {
            content: req.body.choices[3].content,
            is_correct: req.body.choices[3].isCorrect,
            questionId: res.locals.question_id,
          },
        ],
      })
      .then((data: any) => {
        res
          .send(sendTemplate({ message: "Successfully created!" }))
          .status(Code.s200_OK);
      })
      .catch((err: any) => {
        console.log(err);
        res
          .status(Code.S400_Bad_Request)
          .send(sendTemplate({ message: "Error in creating question" }));
      })
      .finally(async () => {
        await prisma.$disconnect;
      });
  }
);

router.put("/:questionID", async (req: Request, res: Response) => {
  console.log(req.body);
  const UpdateQuestion = await prisma.question
    .update({
      where: {
        id: Number(req.params.questionID),
      },
      data: {
        content: req.body.content,
        score: Number(req.body.score),
        choice: {
          update: {
            where: {
              id: req.body.choices[0].id,
            },
            data: {
              content: req.body.choices[0].content,
              is_correct: req.body.choices[0].is_correct,
            },
          },
        },
      },
    })
    .catch((e) => {
      console.log(e);
      res
        .status(Code.S400_Bad_Request)
        .send(
          sendTemplate(
            { message: "unsuccefully update 1" },
            Code.S400_Bad_Request
          )
        );
    });
  const update2ndchoice = await prisma.choice
    .update({
      where: {
        id: req.body.choices[1].id,
      },
      data: {
        content: req.body.choices[1].content,
        is_correct: req.body.choices[1].is_correct,
      },
    })
    .catch((e) => {
      res
        .status(Code.S400_Bad_Request)
        .send(
          sendTemplate(
            { message: "unsuccefully update 2" },
            Code.S400_Bad_Request
          )
        );
    });
  const update3rdchoice = await prisma.choice
    .update({
      where: {
        id: req.body.choices[2].id,
      },
      data: {
        content: req.body.choices[2].content,
        is_correct: req.body.choices[2].is_correct,
      },
    })
    .catch((e) => {
      res
        .status(Code.S400_Bad_Request)
        .send(
          sendTemplate(
            { message: "unsuccefully update 3" },
            Code.S400_Bad_Request
          )
        );
    });
  const update4thchoice = await prisma.choice
    .update({
      where: {
        id: req.body.choices[3].id,
      },
      data: {
        content: req.body.choices[3].content,
        is_correct: req.body.choices[3].is_correct,
      },
    })
    .catch((e) => {
      res
        .status(Code.S400_Bad_Request)
        .send(
          sendTemplate(
            { message: "unsuccefully update 3" },
            Code.S400_Bad_Request
          )
        );
    });
  res
    .status(Code.s200_OK)
    .send(sendTemplate({ message: "Successfully Updated" }, Code.s200_OK));
});

router.delete("/:question_id", async (req: Request, res: Response) => {
  const deleteQuestion = await prisma.question
    .delete({
      where: {
        id: Number(req.params.question_id),
      },
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      prisma.$disconnect();
    });
});
export const QuestionRouter: Router = router;
