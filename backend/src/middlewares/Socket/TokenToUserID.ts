import { PrismaClient } from "@prisma/client";
import { Socket, Server } from "socket.io";
const prisma = new PrismaClient();

export const TokenToUserID = async (socket: Socket, next: any) => {
  return await prisma.token
    .findUnique({
      where: {
        token: socket.handshake.auth.token,
      },
    })
    .then((data) => {
      socket.data.userID = data?.usersId;
      next();
    })
    .catch((e) => {
      console.log(e);
    })
    .finally(() => {
      prisma.$disconnect;
    });
};
