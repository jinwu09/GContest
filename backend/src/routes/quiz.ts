import { Router, Request, Response } from "express";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { sendTemplate, Code } from "../methods/template";

const prisma = new PrismaClient();
const router = Router();

//Get all Quizzes
router.get("/", async (req: Request, res: Response, next) => {
  const showQuiz: any = await prisma.quiz
    .findMany({
      where: {
        status: "PUBLIC",
      },
      include: {
        creator: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        room: true
      },
    })
    .catch((e: any) => {
      console.log(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  showQuiz.forEach((element: any) => {
    element.admin = element.creator_id == res.locals.userId ? true : false;
  });
  return res.send(sendTemplate(showQuiz));
});

//Get Specific
router.get("/:quiz_id", async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(Code.S400_Bad_Request)
      .send(sendTemplate({ errors: errors.array() }));
  }

  const quiz_detail = await prisma.quiz
    .findUnique({
      where: {
        id: parseInt(req.params.quiz_id),
      },
      include: {
        question: {
          include: {
            choice: true,
          },
        },
      },
    })
    .catch((e: any) => {
      console.log(e);
    })
    .then((data: any) => {
      res.send(sendTemplate(data));
    })
    .finally(async () => {
      await prisma.$disconnect;
    });
});

//Get all user created
router.get("/created/:user_id/", async (req: Request, res: Response) => {
  const user_created_quiz = await prisma.quiz
    .findMany({
      where: {
        creator_id: parseInt(req.params.user_id),
      },
      select: {
        id: true,
        room: true,
        title: true,
      },
    })
    .catch((e: any) => {
      console.log(e);
    })
    .then((data: any) => {
      res.send(sendTemplate(data));
    })
    .finally(async () => {
      await prisma.$disconnect;
    });
});

//Create Quiz
router.post(
  "/",
  body("title").isString().isLength({ min: 1 }),
  body("status").isString(),
  body("room").isString(),
  async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }

    const checkRoom = await prisma.room
      .findFirst({
        where: {
          room: req.body.room,
        },
        select: {
          room: true,
        },
      })
      .then((room) => {
        if (room != null) {
          return res
            .status(Code.S400_Bad_Request)
            .send(sendTemplate("rooms is already exist"));
        }
        next();
      });
  },
  async (req: Request, res: Response, next) => {
    console.log(req.body.status);
    const createquiz = await prisma.quiz
      .create({
        data: {
          title: req.body.title,
          password: req.body.password,
          status: req.body.status,
          creator_id: res.locals.userId,
          room: {
            create: {
              room: req.body.room,
            },
          },
        },
        select: {
          id: true,
        },
      })
      .then(async (data: any) => {
        return res.send(sendTemplate({ quiz_id: data.id })).status(200);
        // res.locals.room = req.body.room
        // next()
      })
      .catch((e) => {
        console.log(e);
        return res.status(400).send(sendTemplate("Bad Request"));
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }
);

router.put("/:quiz_id", async (req: Request, res: Response, next) => {
  const updateQuiz = await prisma.quiz
    .update({
      where: {
        id: req.params.quiz_id as any,
      },
      data: {
        room: req.body.room,
        password: req.body.password,
        status: req.body.status,
        title: req.body.title,
      },
    })
    .catch((e: any) => {
      console.log(e);
    })
    .then((data: any) => {
      res.send(sendTemplate("Successfully Updated"));
    })
    .finally(async () => {
      await prisma.$disconnect;
    });
});

router.delete("/:quiz_id", async (req: Request, res: Response) => {
  const deleteQuiz = await prisma.quiz
    .delete({
      where: {
        id: req.params.quiz_id as any,
      },
    })
    .catch((e: any) => {
      console.log(e);
    })
    .then((data: any) => {
      res.send(sendTemplate("Successfully Deleted"));
    })
    .finally(async () => {
      await prisma.$disconnect;
    });
});

export const QuizRouter: Router = router;
