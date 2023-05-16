import { validationResult } from "express-validator";
import { Code, sendTemplate } from "../methods/template";
import { NextFunction, Request, Response } from "express";

export const Validate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(Code.S400_Bad_Request)
      .send(sendTemplate({ errors: errors.array() }));
  }
  next();
};
