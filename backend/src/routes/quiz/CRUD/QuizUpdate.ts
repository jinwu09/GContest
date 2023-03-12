import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sendTemplate, Code } from "../../../methods/template";
import { body } from "express-validator/src/middlewares/validation-chain-builders";
import { validationResult } from "express-validator";
import * as crypto from "crypto";

const prisma = new PrismaClient();
export const QuizUpdateRouter: Router = Router();
