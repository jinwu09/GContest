import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { indexRouter } from "./src";

// external listener for socketio
import { SocketListener } from "./src/services/socket/SocketIndex";
import { SocketCheckToken } from "./src/middlewares/Socket/SocketCheckToken";
import { TokenToUserID } from "./src/middlewares/Socket/TokenToUserID";
import { Code, sendTemplate } from "./src/methods/template";
import { send } from "process";

export const app: Express = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:8080", "http://192.168.137.1:5173/", "*"],
    // origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["my-custom-header"],
  },
});

const port = 8080;
app.use(cors());
app.use(express.json());

// routes
app.use("/api", indexRouter);

app.get("/test", (req: Request, res: Response) => {
  res.send("the typescript express get method is working");
});

app.all("/*", (req: Request, res: Response) => {
  res
    .status(Code.S400_Bad_Request)
    .send(sendTemplate({ msg: "Route doesn't exist" }, Code.S400_Bad_Request));
});

httpServer.listen(port, () => {
  console.log("The server is running in port " + port);
});

// using middleware for websocket
io.use(SocketCheckToken);
io.use(TokenToUserID);

io.on("connection", (socket) => {
  SocketListener(socket, io);
});
