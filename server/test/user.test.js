import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../app.js";

test("POST success user register, 201 status code", async () => {
  const res = await request(app)
    .post("/register") //method
    .send({
      email: "ariigrangetto25@gmail.com",
      username: "ariigrangetto25",
      password: "ariigrangetto5",
    }) //body
    .set("Content-Type", "application/json"); //headers

  assert.strictEqual(res.statusCode, 201); //validations
  assert.ok(res.body.id);
});
