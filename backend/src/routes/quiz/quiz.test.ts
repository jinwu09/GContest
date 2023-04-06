import { start } from "repl";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import * as crypto from "crypto";

// this includes
// create of
// choice
// question
// quiz

const SERVER_URL = process.env.SERVER_URL;
var token: any;
var quizId: string;

const startfunc = async () => {
  await supertest(SERVER_URL)
    .post("/user/login")
    .send({ email: "albert@gmail.com", password: "secret" })
    .then((res) => {
      token = res.body.data.payload.jwtoken;
      if (res.statusCode != 200) {
        console.log(res.body);
      }
    });
};
const startGetQuizId = async () => {
  await supertest(SERVER_URL)
    .get("/quiz/user_created_quiz")
    .send({ token })
    .then((res) => {
      if (res.statusCode == 400) {
        console.log(token);
        console.log(res.body);
      }

      quizId = res.body.data.payload[0].id;
    });
};

const StartGetQuesionID = async () => {
  await supertest(SERVER_URL)
    .post("/quiz/quiz_detail")
    .send({
      token: process.env.token,
      quizId,
    })
    .then((res) => {
      console.log(res.body.data.payload);
      if (res.statusType != 200) {
      }
    });
};

beforeAll(async () => {
  await startfunc();
});

describe("QuizCreate", () => {
  it("it should create a quiz", async () => {
    await supertest(SERVER_URL)
      .post("/quiz/create_quiz")
      .send({
        token,
        title: "run test title",
        status: "ongoing",
        room: crypto.randomUUID(),
        start_at: faker.date.recent(1, "2023-01-01T00:00:000Z"),
        ends_at: faker.date.recent(0, "2023-01-01T00:00:000Z"),
      })
      .then((res) => {
        if (res.statusCode == 400) {
          console.log(res.body);
          console.log(res.body.data.payload);
        }
        expect(res.statusCode).toBe(201);
      });
  });
  it("should not create a quiz", async () => {
    await supertest(SERVER_URL)
      .post("/quiz/create_quiz")
      .send({
        token,
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
  it("shoudl not create without a token", async () => {
    await supertest(SERVER_URL)
      .post("/quiz/create_quiz")
      .send({
        title: "run test title",
        status: "ongoing",
        room: faker.name.firstName(),
        start_at: faker.date.recent(1, "2023-01-01T00:00:000Z"),
        ends_at: faker.date.recent(0, "2023-01-01T00:00:000Z"),
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
  it("shoudl not create without a title", async () => {
    await supertest(SERVER_URL)
      .post("/quiz/create_quiz")
      .send({
        token,
        status: "ongoing",
        room: faker.name.jobArea(),
        start_at: faker.date.recent(1, "2023-01-01T00:00:000Z"),
        ends_at: faker.date.recent(0, "2023-01-01T00:00:000Z"),
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
  it("shoudl not create without a status", async () => {
    await supertest(SERVER_URL)
      .post("/quiz/create_quiz")
      .send({
        token,
        title: "run test title",
        room: faker.name.jobArea(),
        start_at: faker.date.recent(1, "2023-01-01T00:00:000Z"),
        ends_at: faker.date.recent(0, "2023-01-01T00:00:000Z"),
      })
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
  describe("Question Create", () => {
    beforeAll(async () => {
      await startGetQuizId();
    });
    it("should be creating a question", async () => {
      console.log(quizId);
      await supertest(SERVER_URL)
        .post("/quiz/create_question")
        .send({
          token,
          content: "sample is albert a innocent",
          score: 2,
          quizID: quizId,
        })
        .then((res) => {
          console.log(res.body.data.payload);
        });
    });
  });
  describe("creating choice", () => {
    it("should sucesfully create a choice", async () => {
      await supertest(SERVER_URL)
        .post("/quiz/create_choice")
        .send({
          token,
          questionID: "",
          content: faker.color,
          is_correct: false,
        })
        .then((res) => {
          if (res.statusCode != 200) {
            console.log(res.body);
          }
          expect(res.statusCode).toBe(200);
        });
    });
  });
});
