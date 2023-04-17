import { Socket, Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
// import { TokenCheck } from "../../methods/TokenCheck";

const prisma = new PrismaClient();

export const QuizStartSocketListener = (socket: Socket, io: Server) => {
  socket.on("QuizStart", async (dataIO) => {
    // guard claue done
    // room done
    // quizID gotten from room done
    // token check if its creator done
    // const userID: any = await TokenCheck(dataIO.token);
    // console.log(userID);
    // if (userID == null) {
    //   return;
    // }
    const getquizID = await prisma.room.findUnique({
      where: {
        room: dataIO.room,
      },
    });
    const getQuestion: any = await prisma.question
      .findMany({
        where: {
          quizId: getquizID?.id,
          // answer: {
          //   none: {
          //     usersId: userID,
          //     // usersId: "12990eef-1daf-411d-ab43-d26d41df788e",
          //   },
          // },
        },
        include: {
          choice: true,
        },
      })
      .then((datas) => {
        if (datas != null) {
          return datas[0];
        }
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(getQuestion);
    const output = { getQuestion };
    io.in(dataIO.room).emit("QuizStart", getQuestion);
    // socket.in(dataIO.room).emit("QuizStart", output);
    // socket.emit("QuizStart", getQuestion);
  });

  socket.on("QuizSubmit", async (dataIO) => {
    // guard claue done
    // room done
    // quizID gotten from room done
    // token check if its creator done
    // put
    // question id
    // choice id
    // user id put
    // quiz id
    // const userId: string | null = await TokenCheck(dataIO.token);
    // if (userId == null) {
    //   return;
    // }

    const createAnswer = await prisma.answer
      .create({
        data: {
          questionId: dataIO.questionId,
          choiceId: dataIO.choiceId,
          usersId: dataIO.userId,
          quizId: dataIO.quizId,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        console.log(data);
        console.log("created Answer");
      })
      .finally(async () => {
        await prisma.$disconnect();
      });

    const getquizID = await prisma.room.findUnique({
      where: {
        room: dataIO.room,
      },
    });
    const getQuestion: any = await prisma.question
      .findMany({
        where: {
          quizId: getquizID?.id,
          // answer: {
          // none: {
          // usersId: userId,
          // usersId: "12990eef-1daf-411d-ab43-d26d41df788e",
          // },
          // },
        },
        include: {
          choice: true,
        },
      })
      .then((datas) => {
        return datas.forEach((data: any, index) => {
          if (data.id == dataIO.questionId) {
            if (data[index + 1] != null) {
              return data[index + 1];
            }
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(getQuestion);
    const output = { getQuestion };
    // io.in(dataIO.room).emit("QuizSubmit", getQuestion);
    // socket.in(dataIO.room).emit("QuizStart", output);
    socket.emit("QuizSubmit", getQuestion);
  });
};
