import { Socket, Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
// import { TokenCheck } from "../../methods/TokenCheck";

const prisma = new PrismaClient();

export const QuizStartSocketListener = (socket: Socket, io: Server) => {
  socket.on("QuizStart", async (dataIO) => {
    console.log("redirecting");
    const GetQuizList = await prisma.room
      .findMany({
        where: {
          room: socket.data.Roomname,
        },
      })
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        // console.log(data);
      })
      .finally(() => {
        prisma.$disconnect();
      });
    socket.emit("redirect", {});
    socket.to(dataIO.Roomname).emit("redirect", {
      quiz_id: "test",
    });
  });

  socket.on("QuizSubmit", async (dataIO) => {});
};
