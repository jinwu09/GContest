import { Router, Request, Response } from "express";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { sendTemplate, Code } from "../methods/template";
import { totalmem } from "os";

const prisma = new PrismaClient();
const router = Router();

//Get all Quizzes
router.get("/", async (req: Request, res: Response, next) => {
  const showQuiz: any = await prisma.quiz
    .findMany({
      where: {
        OR: [
          {
            creator_id: res.locals.userId,
            status: "PRIVATE",
          },
          {
            status: "PUBLIC",
          },
        ],
      },
      include: {
        creator: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        room: true,
      },
    })
    .catch((e: any) => {
      console.log(e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  console.log(showQuiz);
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
        room: {
          select: { room: true },
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
// update quiz id
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

// delete specific quiz by id
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

// get leaderboard
router.get(
  "/leaderboard/:session/:room",
  async (req: Request, res: Response) => {
    let getAnswerIndividual = await prisma.user
      .findMany({
        where: {
          Answer: {
            some: {
              quizSessionId: Number(req.params.session),
            },
          },
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          Answer: {
            where: {
              quizSessionId: Number(req.params.session),
              choice: {
                is_correct: true,
              },
            },
            select: {
              Question: {
                select: {
                  score: true,
                },
              },
              choice: {
                select: {
                  is_correct: true,
                },
              },
            },
          },
        },
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .finally(() => prisma.$disconnect());
    let getScoreTotal: any = [];
    getAnswerIndividual.forEach((item) => {
      let obj = {
        id: item.id,
        first_name: item.first_name,
        last_name: item.first_name,
        score: 0,
      };
      item.Answer.forEach((item) => {
        if (item.choice?.is_correct == true) {
          obj.score += item.Question?.score;
        }
      });
      getScoreTotal.push(obj);
    });
    const getTotalQuizScore = await prisma.room
      .findUnique({
        where: {
          room: req.params.room,
        },
        select: {
          Quiz: {
            select: {
              question: {
                select: {
                  score: true,
                },
              },
            },
          },
        },
      })
      .then((data) => {
        let total = 0;
        data?.Quiz?.question.forEach((item) => {
          total += item.score;
        });
        return total;
      })
      .finally(() => prisma.$disconnect());
    console.log({
      UsersScore: getScoreTotal,
      QuizTotal: getTotalQuizScore,
      message: "leaderboard list",
    });
    res.status(Code.s200_OK).send(
      sendTemplate(
        {
          UsersScore: getScoreTotal,
          QuizTotal: getTotalQuizScore,
          message: "leaderboard list",
        },
        200
      )
    );
  }
);

// show feedback view
router.get("/feedback/:session", async (req: Request, res: Response) => {
  const getAnswer = await prisma.quizSession
    .findFirst({
      where: {
        id: Number(req.params.session),
      },
      include: {
        Room: {
          include: {
            Quiz: {
              include: {
                question: {
                  include: {
                    choice: true,
                    answer: {
                      where: {
                        usersId: res.locals.userId,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
    .then((data) => {
      return data?.Room.Quiz;
    });
  console.log(getAnswer);
  res
    .status(Code.s200_OK)
    .send(
      sendTemplate(
        { feedback: getAnswer, message: "this is just a testing" },
        Code.s200_OK
      )
    );
});

export const QuizRouter: Router = router;
