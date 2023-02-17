import { Router, Request, Response } from "express";

export const users: Router = Router();

users.get("/test", async (req: Request, res: Response) => {
  res.send("testing users/test");
});
