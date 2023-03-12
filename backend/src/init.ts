// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(name: string = "albert") {
  var userID = "";
  const createUser = await prisma.users.create({
    data: {
      email: name + "@gmail.com",
      first_name: name + " John",
      last_name: "Santos",
      password: "secret",
      username: "Jinwusan",
    },
  });
  const createToken = await prisma.token.create({
    data: {
      usersId: createUser.id,
    },
  });
  const createquiz: any = await prisma.quiz
    .create({
      data: {
        title: "all about me",
        password: "",
        room: "idk",
        status: "closed",
        creator_id: createUser.id,
        start_at: new Date(),
        ends_at: new Date(),
      },
    })
    .catch((e) => {
      console.log(e);
    });
  const createQuestion = await prisma.question.create({
    data: {
      content: "meow",
      score: 1,
      quizId: createquiz.id,
    },
  });
  const createChoice = await prisma.choice.createMany({
    data: [
      {
        content: "meow no",
        is_correct: false,
        questionId: createQuestion.id,
      },
      {
        content: "meow yes",
        is_correct: true,
        questionId: createQuestion.id,
      },
      {
        content: "meow i don't know",
        is_correct: false,
        questionId: createQuestion.id,
      },
    ],
  });
  console.log("data initilized");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
