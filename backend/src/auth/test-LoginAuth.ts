import { assert, should } from "chai";
import { describe, it } from "node:test";
import * as request from "supertest";
import { app } from "../app";

const server_url = process.env.SERVER_URL;

describe("login api test", () => {
  it("should be login successfully", () => {
    request(app)
      .get(`${server_url}/quiz/test`)
      .then((data) => {
        console.log(data);
        // assert.equal();
      });
  });
});
