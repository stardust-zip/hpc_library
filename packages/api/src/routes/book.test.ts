import request from "supertest";
import app from "../app";
import prisma from "../lib/prisma";
import { describe, it, expect, afterEach, beforeAll } from "vitest";

describe("POST /api/books", () => {
  // Clean database after finishing
  afterEach(async () => {
    await prisma.book.deleteMany();
  });

  it("Create a book and return it", async () => {
    const newBook = {
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
      description: "Guide the the galaxy",
      isbn: "978-0345391803",
    };

    const response = await request(app).post("/api/books").send(newBook);

    expect(response.status).toBe(201); // 201 Created
    expect(response.body.title).toBe(newBook.title);
    expect(response.body.author).toBe(newBook.author);
    expect(response.body.description).toBe(newBook.description);

    // Check if the book is saved to database
    const dbBook = await prisma.book.findUnique({
      where: { isbn: newBook.isbn },
    });
    expect(dbBook).not.toBeNull();
  });

  it("Return 400 error if the request body is invalid", async () => {
    const response = await request(app)
      .post("/api/books")
      .send({ author: "Random Person" });

    expect(response.status).toBe(400);
  });
});

describe("GET /api/books", () => {
  afterEach(async () => {
    await prisma.book.deleteMany();
  });

  // Create book before running test
  beforeAll(async () => {
    await prisma.book.createMany({
      data: [
        {
          title: "1984",
          description: "A dystopian novel",
          author: "George Orwell",
          isbn: "978-1231231238",
        },
        {
          title: "Brave New Word",
          description: "Another dystopian novel",
          author: "Aldous Huxley",
          isbn: "978-91283712",
        },
      ],
    });
  });

  it("should return a list of all book", async () => {
    const response = await request(app).get("/api/books");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
    expect(response.body[0].title).toBe("1984");
  });
});
