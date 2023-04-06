import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export const Answer = {
//   Create: async (quizID: string, questionID: string, choiceID: string) => {
//     const createAnswer = await prisma.answer.create;
//   },
//   Generate: async (userID: string, quizID: string) => {
//     const generateAnswer = await prisma.quiz.createMany({
//       data: {},
//     });
//   },
// };
