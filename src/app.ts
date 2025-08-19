
import express, { Request, Response } from "express";
import cors from "cors";
import { logger } from "./shared/middlewares/logger";

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

export default app;
