import request from "supertest";
import app from "./app";
import { describe, it, expect } from "vitest";

describe("GET /", () => {
  it("should respond with a 200 status and a welcome message", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Welcome to the HPC Library API",
    });
  });
});
