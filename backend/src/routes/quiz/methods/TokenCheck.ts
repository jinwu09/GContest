import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const TokenCheck = async (inputToken: string) => {
  const API_KEY: string = process.env.API_KEY || "secret";
  if (inputToken == null) return null;
  const token: any = jwt.verify(inputToken, API_KEY);
  const checkToken = await prisma.token
    .findUnique({
      where: {
        token: token.token,
      },
    })
    .catch((e) => {
      console.log(e);
      return null;
    })
    .then((data) => {
      if (data != null) {
        return data.usersId;
      } else {
        return null;
      }
    });
  return checkToken;
};
