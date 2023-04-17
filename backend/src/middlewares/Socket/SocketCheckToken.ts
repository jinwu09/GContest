import { PrismaClient } from "@prisma/client";
import { Socket, Server } from "socket.io";
const prisma = new PrismaClient();

export const SocketCheckToken = async (socket: Socket, next: any) => {
  const clientToken = socket.handshake.auth.token;
  const checktoken = await prisma.token
    .findUnique({
      where: {
        token: clientToken,
      },
      select: {
        token: true,
        Users: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    })
    .catch((e) => {
      console.log(e);
    })
    .then((data) => {
      if (data != null) {
        socket.data.first_name = data.Users.first_name;
        socket.data.last_name = data.Users.last_name;
        console.log(
          `${socket.id} is success auth ${clientToken} username ${socket.data.first_name} ${socket.data.last_name}`
        );
        socket.data.token = data?.token;
        console.count("connected");
        next();
      } else {
        console.count("bad token");
      }
    })
    .finally(() => {
      prisma.$disconnect();
    });
};
