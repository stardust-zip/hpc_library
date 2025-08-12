import request from "supertest";
import app from "../app";
import prisma from "../lib/prisma";
import { describe, it, expect, afterEach } from "vitest";

describe("POST /api/books", () => {
  // Sau khi hoàn thành test, làm sạch database
  afterEach(async () => {
    await prisma.book.deleteMany();
  });

  it("Tạo một cuốn sách và trả về nó", async () => {
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

    // Kiểm tra xem cuốn sách đã được lưu vào database chưa
    const dbBook = await prisma.book.findUnique({
      where: { isbn: newBook.isbn },
    });
    expect(dbBook).not.toBeNull();
  });
});
