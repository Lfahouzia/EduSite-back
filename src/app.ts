
import express, { Request, Response } from "express";
import cors from "cors";
import { logger } from "./shared/middlewares/logger";
import authRoutes from "./features/auth/auth.routes";
import roleRoutes from "./features/roles/role.routes";
import permissionRoutes from "./features/permissions/permission.routes";


const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

// Importing routes
app.use("/api", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);

export default app;
