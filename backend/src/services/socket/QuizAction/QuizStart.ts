import { Socket, Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
// import { TokenCheck } from "../../methods/TokenCheck";

const prisma = new PrismaClient();

export const QuizStartSocketListener = (socket: Socket, io: Server) => {
  socket.on("QuizStart", async (dataIO) => {
    console.log("redirecting");
    const GetQuizList: any = await prisma.room
      .findUnique({
        where: {
          room: dataIO.Roomname,
        },
        include: {
          Quiz: {
            include: {
              question: {
                include: {
                  choice: true,
                },
              },
            },
          },
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        return data?.Quiz?.question;
      })
      .finally(() => {
        prisma.$disconnect();
      });
    socket.data.questionArr = GetQuizList;
    socket.data.QuestionIndex = 0;
    const DeleteExistingSession = await prisma.quizSession
      .delete({
        where: {
          roomName: dataIO.Roomname,
        },
      })
      .catch((e) => {
        // console.log(e);
      })
      .finally(() => {
        prisma.$disconnect();
      });
    const CreateQuizSession = await prisma.quizSession
      .create({
        data: {
          questionId: socket.data.questionArr[socket.data.QuestionIndex].id,
          roomName: dataIO.Roomname,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        prisma.$disconnect();
      });
    socket.emit("redirect");
    socket.to(dataIO.Roomname).emit("redirect");
  });

  socket.on("next", async (dataIO) => {
    if (
      socket.data.QuestionIndex >= 0 &&
      socket.data.QuestionIndex < socket.data.questionArr.length - 1
    ) {
      socket.data.QuestionIndex++;
      const UpdateSession = await prisma.quizSession.update({
        where: {
          roomName: dataIO.Roomname,
        },
        data: {
          questionId: socket.data.questionArr[socket.data.QuestionIndex].id,
        },
      });
      socket.emit("refresh");
      socket.to(dataIO.Roomname).emit("refresh");
    }
  });
  socket.on("previous", async (dataIO) => {
    if (
      socket.data.QuestionIndex > 0 &&
      socket.data.QuestionIndex < socket.data.questionArr.length
    ) {
      socket.data.QuestionIndex = socket.data.QuestionIndex - 1;
      const UpdateSession = await prisma.quizSession.update({
        where: {
          roomName: dataIO.Roomname,
        },
        data: {
          questionId: socket.data.questionArr[socket.data.QuestionIndex].id,
        },
      });
      socket.emit("refresh");
      socket.to(dataIO.Roomname).emit("refresh");
    }
  });
  socket.on("QuizLoad", async (dataIO) => {
    const getQuizSession = await prisma.quizSession
      .findFirst({
        where: {
          roomName: dataIO.Roomname,
        },
        include: {
          Question: {
            include: {
              choice: {
                select: {
                  id: true,
                  content: true,
                },
              },
            },
          },
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        return data?.Question;
      });
    socket.emit("QuizLoad", {
      question: getQuizSession,
    });
  });

  socket.on("AdminQuizLoad", (dataIO) => {
    socket.emit("AdminQuizLoad", {
      LastQuestion:
        socket.data.QuestionIndex == socket.data.questionArr.length - 1,
      FirstQuestion: socket.data.QuestionIndex == 0,
    });
  });
  socket.on("AnswerSubmit", async (dataIO) => {
    const GetQuizID = await prisma.question
      .findUnique({
        where: {
          id: dataIO.QuestionID,
        },
        select: {
          quizId: true,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        return data?.quizId;
      })
      .finally(() => {
        prisma.$disconnect();
      });
    const choiceID: any = dataIO.choice;
    const QuestionID: any = dataIO.QuestionID;
    const userID: any = socket.data.userID;
    const CreateAnswer: any = await prisma.answer
      .create({
        data: {
          choiceId: choiceID,
          questionId: QuestionID,
          quizId: GetQuizID,
          usersId: userID,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .then(() => {
        socket.emit("AnswerSubmited", { has_Submitted: true });
      });
  });
};
