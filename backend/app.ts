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
    origin: ["http://localhost:8080", "http://192.168.137.1:5173/", "http://quiger.com", "https://quiger.com"],
    // origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["my-custom-header"],
  },
});

let winston = require('winston'),
  expressWinston = require('express-winston');

const port = 8080;
app.use(cors());
app.use(express.json());


// Request/Response Logger
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info: any) => {
      const {
        timestamp, level, message, ...args
      } = info;

      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    }),
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red). // optional: allows to skip some log messages based on request and/or response
}));

// routes
app.use("/api", indexRouter);

app.all("/*", (req: Request, res: Response) => {
  res
    .status(Code.S400_Bad_Request)
    .send(sendTemplate({ msg: "Route doesn't exist" }, Code.S400_Bad_Request));
});

// error logger
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info: any) => {
      const {
        timestamp, level, message, ...args
      } = info;

      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    }),
  )
}))

httpServer.listen(port, () => {
  console.log("The server is running in port " + port);
});

// using middleware for websocket
io.use(SocketCheckToken);
io.use(TokenToUserID);

io.on("connection", (socket) => {
  SocketListener(socket, io);
});
