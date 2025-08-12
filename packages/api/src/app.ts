// File này sẽ dùng để cài toàn bộ middleware, route, logic
import express, { Request, Response } from "express";
import helmet from "helmet";
import bookRouter from "./routes/book.routes";

const app = express();

// Middlewares
app.use(helmet()); // Apply basic security headers
app.use(express.json()); // Parse JSON bodies

// Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to the HPC Library API" });
});

app.use("/api/books", bookRouter);

export default app;
