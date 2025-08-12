import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description, author, isbn } = req.body;
    const newBook = await prisma.book.create({
      data: { title, description, author, isbn },
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Tạo sách thất bại" });
  }
});

export default router;
