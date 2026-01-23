import "dotenv/config";
import test from "node:test";
//recomendado utilizar strict
import { strict as assert } from "node:assert";
import request from "supertest";
import app from "../app.js";

//REGISTER

test("POST /register success user register, 201 status code", async () => {
  const res = await request(app)
    .post("/register") //method
    .send({
      email: "ariigrangetto30@gmail.com",
      username: "ariigrangetto30",
      password: "ariigrangetto5",
    }) //body
    .set("Content-Type", "application/json"); //headers

  assert.strictEqual(res.statusCode, 201); //validations
  assert(res.body.userId);
});

test("POST /register user alredy exists, 400 status code", async () => {
  const res = await request(app)
    .post("/register") //method
    .send({
      email: "ariigrangetto30@gmail.com",
      username: "ariigrangetto30",
      password: "ariigrangetto5",
    }) //body
    .set("Content-Type", "application/json");

  assert.strictEqual(res.statusCode, 400);
});

//LOGIN

test("POST /login user logged in succesfully, 201 status code", async () => {
  const res = await request(app)
    .post("/login")
    .send({
      email: "ariigrangetto30@gmail.com",
      password: "ariigrangetto5",
    })
    .set("Content-Type", "application/json");

  assert.strictEqual(res.statusCode, 201);
  assert(res.body.userId);
});
