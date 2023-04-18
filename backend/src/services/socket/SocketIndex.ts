import { Socket, Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import * as crypto from "crypto";
import { QuizStartSocketListener } from "./QuizAction/QuizStart";
import { QuizRoomSocketListener } from "./Room/QuizRoom";

const prisma = new PrismaClient();

export const SocketListener = (socket: Socket, io: Server) => {
  // console.log(socket.handshake.);
  QuizStartSocketListener(socket, io);

  QuizRoomSocketListener(socket, io);

  socket.on("message", (dataIO) => {
    console.log("this is from quiz" + dataIO);
  });

  socket.on("disconnect", (dataIO) => {
    console.log(`${socket.data.first_name} leave the quiz`);
  });
};
// import express, { Express, Request, Response } from "express";
// import { usersRouter } from "./routes/users/userIndex";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors";

// import * as quizindex from "./routes/quiz/QuizIndex";

// export const app: Express = express();
// const httpServer = createServer(app);
// export const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:8080",
//     methods: ["GET", "POST"],
//     credentials: true,
//     allowedHeaders: ["my-custom-header"],
//   },
// });

// const port = 8080;
// app.use(express.json());

// // test socket
// io.on("connection", (socket) => {
//   console.log(socket.id + " user connected");

//   quizindex.SocketListener(socket, io);
// });
// // routes
// app.use("/user", usersRouter);
// app.use("/quiz", quizindex.QuizRouter);

// app.get("/test", (req: Request, res: Response) => {
//   res.send("the typescript express get method is working");
// });

// httpServer.listen(port, () => {
//   console.log("The server is running in port " + port);
// });
