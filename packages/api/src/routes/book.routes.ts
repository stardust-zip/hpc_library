import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import { validate } from "../middleware/validate";
import { createBookSchema } from "./book.validator";

const router = Router();

router.post(
  "/",
  validate(createBookSchema),
  async (req: Request, res: Response) => {
    try {
      const { title, description, author, isbn } = req.body;
      const newBook = await prisma.book.create({
        data: { title, description, author, isbn },
      });
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ error: "Failed to create book" });
    }
  },
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve book" });
  }
});

export default router;
