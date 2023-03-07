import { Router, Request, Response } from "express";
import { Socket } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { sendTemplate, Code } from "../../methods/template";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();
export const QuizRouter: Router = Router();

export const socketlistener = (socket: Socket) => {
  socket.on("message", (message) => {
    console.log("this is from quiz" + message);
  });
  socket.on("test", (message) => {
    socket.join("");
  });
  socket.on("room", (message) => {
    socket.join(message.Roomname);
    // console.log(message);
    console.log(socket.rooms);
    socket
      .to(message.Roomname)
      .emit("hey", "new user have joined: " + message.Username);
    socket.emit("hey", "hallo");
  });
  socket.on("room?", () => {
    console.log(socket.rooms.entries);
    socket.emit("room?", socket.rooms.entries());
  });
  socket.on("disconnect", (reason) => {
    console.log(socket.rooms);
  });
};

QuizRouter.use((req: Request, res: Response, next) => {
  // console.log(req.body);
  next();
});

QuizRouter.get(
  "/test",
  (req: Request, res: Response, next) => {
    console.log("hello");
    res.send("Sendd");
    next();
  },
  (req: Request, res: Response) => {
    console.log("2nd nexxt");
  }
);

QuizRouter.post(
  "/create_quiz",
  body("title").isString().isLength({ min: 1 }),
  body("status").isString(),
  body("room").isString(),
  body("creator").isString(),
  body("start_at").isString(),
  body("ends_at").isString(),
  async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(Code.S400_Bad_Request)
        .send(sendTemplate({ errors: errors.array() }));
    }

    const checkRoom = prisma.quiz
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
  async (req: Request, res: Response) => {
    const createquiz = await prisma.quiz
      .create({
        data: {
          title: req.body.title,
          password: req.body.password,
          room: req.body.room,
          status: req.body.status,
          creator_id: req.body.creator,
          start_at: new Date(req.body.start_at),
          ends_at: new Date(req.body.ends_at),
        },
      })
      .catch((e) => {
        console.log(e);
        res
          .status(Code.S400_Bad_Request)
          .send(sendTemplate("misssing credential", Code.S400_Bad_Request));
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
),
  QuizRouter.get("/show_quizes", async (req: Request, res: Response, next) => {
    const showQuiz = await prisma.quiz
      .findMany({
        include: {
          question: true,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    res.status(Code.s200_OK).send(sendTemplate(showQuiz));
  });

QuizRouter.post(
  "/quiz_detail",
  body("quiz").isString(),
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
          id: req.body.quiz,
        },
        include: {
          question: true,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        res.send(sendTemplate(data));
      })
      .finally(async () => {
        await prisma.$disconnect;
      });
  }
);

QuizRouter.post(
  "/create_question",
  body("content").isString(),
  body("score").isNumeric(),
  body("quiz").isString(),
  async (req: Request, res: Response, next) => {
    const createQuestion = await prisma.question
      .create({
        data: {
          content: req.body.content,
          score: req.body.score,
          quizId: req.body.quiz,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        res.send(sendTemplate("successfully made"));
      })
      .finally(async () => {
        await prisma.$disconnect;
      });
  }
);
