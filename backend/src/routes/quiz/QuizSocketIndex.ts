import { Socket, Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import * as crypto from "crypto";
import { QuizStartSocketListener } from "./socket/QuizAction/QuizStart";
import { QuizRoomSocketListener } from "./socket/Room/QuizRoom";

const prisma = new PrismaClient();

export const SocketListener = (socket: Socket, io: Server) => {
  QuizStartSocketListener(socket, io);

  QuizRoomSocketListener(socket);

  socket.on("message", (dataIO) => {
    console.log("this is from quiz" + dataIO);
  });

  socket.on("disconnect", (dataIO) => {
    console.log(socket.rooms);
  });
};
