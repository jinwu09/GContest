import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const TokenCheck = async (inputToken: string, Room: string) => {
  const checkToken = await prisma.quiz
    .findUnique({
      where: {
        room: Room,
      },
      select: {
        room: true,
      },
    })
    .catch((e) => {
      console.log(e);
      return "Bad Request, Error";
    })
    .then((data) => {
      if (data == Room) {
        return true;
      } else {
        return false;
      }
    });
};
