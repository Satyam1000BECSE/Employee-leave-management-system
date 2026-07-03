import request from "supertest";
import app from "../app.js";

describe("Auth API", () => {
  test("should login user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "manager@gmail.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(200);
  });
});