import { Router, Request, Response } from "express";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import { sendTemplate, Code } from "../methods/template";


const prisma = new PrismaClient();
const router = Router()

//Get all Quizzes
router.get('/',
  async (req: Request, res: Response, next) => {
    const showQuiz: any = await prisma.quiz
      .findMany({
        include: {
          question: {
            include: {
              choice: true
            }
          }
        }
      })
      .catch((e: any) => {
        console.log(e)
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    res.status(Code.s200_OK).send(sendTemplate(showQuiz))
  }
)

//Get Specific
router.get('/:quiz_id',
  async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }

    const quiz_detail = await prisma.quiz
      .findUnique({
        where: {
          id: req.params.quiz_id
        },
        include: {
          question: true,
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
  }
)


//Get all user created
router.get('/created/:user_id/',
  async (req: Request, res: Response) => {
    const user_created_quiz = await prisma.quiz
      .findMany({
        where: {
          creator_id: req.params.user_id,
        },
        select: {
          id: true,
          room: true,
          title: true,
          start_at: true,
          ends_at: true,
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
  }
)

// router.get("/recent/:user_id", async (req: Request, res: Response) => {
//   const recent_quiz: any = await prisma.quiz
//     .findMany({
//       where: {
//         usersId: res.locals.userID,
//       },
//       select: {
//         Score: true,
//         created_at: true,
//         Quiz: {
//           select: {
//             title: true,
//           },
//         },
//       },
//     })
//     .catch((e: any) => {
//       console.log(e);
//     })
//     .then((data: any) => {
//       res.send(sendTemplate(data));
//     })
//     .finally(async () => {
//       await prisma.$disconnect;
//     });
//   console.log(recent_quiz);
// });


//Create Quiz
router.post('/',
  body("title").isString().isLength({ min: 1 }),
  body("status").isString(),
  body("room").isString(),
  body("start_at").isString(),
  body("ends_at").isString(),

  async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }

    const checkRoom = await prisma.quiz
      .findUnique({
        where: {
          room: req.body.room,
        },
        select: {
          room: true,
        },
      })
      .then((room) => {
        if (room != null) {
          res
            .status(Code.S400_Bad_Request)
            .send(sendTemplate("rooms is already exist"));
        } else {
          next();
        }
      });
  },
  async (req: Request, res: Response, next) => {
    console.log(res.locals.userID);
    const checkCreator = prisma.users
      .findUnique({
        where: {
          id: res.locals.userID,
        },
      })
      .catch((e) => {
        console.log(e);
        res.status(Code.S400_Bad_Request).send(sendTemplate("bad request"));
      })
      .then((data) => {
        if (data != null) {
          next();
        } else {
          res
            .status(Code.s404_Not_Found)
            .send(sendTemplate("creator doesn't exist"));
        }
      });
  },
  async (req: Request, res: Response) => {
    const createquiz = await prisma.quiz
      .create({
        data: {
          title: req.body.title,
          password: req.body.password,
          room: req.body.room || crypto.randomUUID(),
          status: req.body.status,
          creator_id: res.locals.userID,
          start_at: new Date(req.body.start_at),
          ends_at: new Date(req.body.ends_at),
        },
      })
      .catch((e) => {
        console.log(e);
        res
          .status(Code.S400_Bad_Request)
          .send(sendTemplate("Bad Request", Code.S400_Bad_Request));
      })
      .finally(async () => {
        await prisma.$disconnect();
      })
      .then(() => {
        res
          .status(Code.s201_Created)
          .send(sendTemplate("quiz created", Code.s201_Created));
      });
  }
)

router.put('/:quiz_id',
  async (req: Request, res: Response, next) => {
    const updateQuiz = await prisma.quiz
      .update({
        where: {
          id: req.params.quiz_id,
        },
        data: {
          room: req.body.room,
          password: req.body.password,
          status: req.body.status,
          ends_at: req.body.ends_at,
          start_at: req.body.start_at,
          title: req.body.title,
        },
      })
      .catch((e:any) => {
        console.log(e);
      })
      .then((data:any) => {
        res.send(sendTemplate("Successfully Updated"));
      })
      .finally(async () => {
        await prisma.$disconnect;
      });
  }
)

router.delete('/:quiz_id',
  async (req: Request, res: Response)=>{
    const deleteQuiz = await prisma.quiz
    .delete({
      where: {
        id: req.params.quiz_id
      }
    })
    .catch((e: any)=>{
      console.log(e)
    })
    .then((data:any)=>{
      res.send(sendTemplate("Successfully Deleted"))
    })
    .finally(async ()=>{
      await prisma.$disconnect;
    })
  }
)

export const QuizRouter: Router = router