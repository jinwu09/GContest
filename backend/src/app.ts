import express, { Express, Request, Response } from "express";
import { users } from "./routes/users/userIndex";

const app: Express = express();
const port = 8080;

app.use(express.json());

// routes
app.use("/users", users);

app.get("/test", (req: Request, res: Response) => {
  res.send("the typescript express get method is working");
});

app.listen(port, () => {
  console.log("The server is running in port 8080");
});
