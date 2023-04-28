import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { Code, sendTemplate } from "../methods/template";

const prisma = new PrismaClient();

export const tokenChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (header) {
    const [keyword, token] = header.split(" ");
    if (keyword == "Bearer") {
      const tokenCheck = await prisma.token
        .findFirst({
          where: {
            token: token,
          },
        })
        .then((data) => {
          if (data != null) {
            res.locals.token = data.token;
            res.locals.userId = data.usersId;
            next();
          } else {
            return res
              .status(Code.s401_Unauthorized)
              .send(
                sendTemplate(
                  { message: "Invalid Token 1" },
                  Code.s401_Unauthorized
                )
              );
          }
        })
        .catch((err) => {
          return res
            .status(Code.s401_Unauthorized)
            .send(
              sendTemplate(
                { message: "Invalid Token 2" },
                Code.s401_Unauthorized
              )
            );
        });
    } else {
      return res
        .status(Code.s401_Unauthorized)
        .send(
          sendTemplate({ message: "Invalid Token 3" }, Code.s401_Unauthorized)
        );
    }
  } else {
    return res
      .status(Code.s401_Unauthorized)
      .send(
        sendTemplate({ message: "Invalid Token 4" }, Code.s401_Unauthorized)
      );
  }
};
