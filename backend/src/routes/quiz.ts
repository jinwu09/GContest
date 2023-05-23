import { Router, Request, Response } from "express";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { sendTemplate, Code } from "../methods/template";

const prisma = new PrismaClient();
const router = Router();

function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

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
            condition: "OPEN",
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
    .findFirst({
      where: {
        id: parseInt(req.params.quiz_id),
        creator_id: res.locals.userId,
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
      prisma.$disconnect;
    });

    
});

//Get all user created
router.get("/me/created", async (req: Request, res: Response) => {
  const showQuiz: any = await prisma.quiz
    .findMany({
      where: {
        OR: [
          {
            creator_id: res.locals.userId,
            status: "PRIVATE",
          },
          {
            creator_id: res.locals.userId,
            status: "PUBLIC",
            condition: "OPEN",
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
  showQuiz.forEach((element: any) => {
    element.admin = element.creator_id == res.locals.userId ? true : false;
  });
  return res.send(sendTemplate(showQuiz));

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
    const createquiz = await prisma.quiz
      .create({
        data: {
          title: req.body.title,
          password: req.body.password,
          status: req.body.status,
          creator_id: res.locals.userId,
          description: req.body.description,
          image_path: req.body.image_path,
          room: {
            create: {
              room: req.body.room ? req.body.room : makeid(9),
            },
          },
        },
        select: {
          id: true,
        },
      })
      .then(async (data: any) => {
        return res
          .send(
            sendTemplate({
              quiz_id: data.id,
              message: "Successfully created quiz!",
            })
          )
          .status(200);
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
        id: Number(req.params.quiz_id),
      },
      data: {
        room: {
          update: {
            where: {
              quizId: Number(req.params.quiz_id),
            },
            data: {
              room: req.body.room,
            },
          },
        },
        password: req.body.password,
        status: req.body.status,
        title: req.body.title,
        description: req.body.description,
        image_path: req.body.image_path,
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
        id: Number(req.params.quiz_id),
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
        return data;
      })
      .finally(() => prisma.$disconnect());
    let getScoreTotal: any = [];
    getAnswerIndividual.forEach((item) => {
      let obj = {
        id: item.id,
        first_name: item.first_name,
        last_name: item.last_name,
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
              select: {
                title: true,
                question: {
                  include: {
                    choice: true,
                    answer: {
                      where: {
                        usersId: res.locals.userId,
                        quizSessionId: Number(req.params.session),
                      },
                      select: {
                        id: true,
                        choice: {
                          select: {
                            id: true,
                            content: true,
                            is_correct: true,
                          },
                        },
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
