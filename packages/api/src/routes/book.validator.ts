// packages/api/src/routes/book.validator.ts
import { z } from "zod";

export const createBookSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),

    author: z.string().min(1, { message: "Author is required" }),

    isbn: z.string().min(1, { message: "ISBN is required" }),

    description: z.string().optional(),
  }),
});
