import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { indexRouter } from "./src";

// external listener for socketio
import { SocketListener } from "./src/services/socket/SocketIndex";
import { SocketCheckToken } from "./src/middlewares/Socket/SocketCheckToken";
import { TokenToUserID } from "./src/middlewares/Socket/TokenToUserID";

export const app: Express = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
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

httpServer.listen(port, () => {
  console.log("The server is running in port " + port);
});

// using middleware for websocket
io.use(SocketCheckToken);
io.use(TokenToUserID);

io.on("connection", (socket) => {
  SocketListener(socket, io);
});
