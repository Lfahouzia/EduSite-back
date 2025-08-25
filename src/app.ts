
import express, { Request, Response } from "express";
import cors from "cors";
import { logger } from "./shared/middlewares/logger";
import authRoutes from "./features/auth/auth.routes";
import roleRoutes from "./features/roles/role.routes";
import permissionRoutes from "./features/permissions/permission.routes";
import tutorsRoutes from "./features/tutor/tutor.routes";
import enrollmentRoutes from "./features/enrollments/enrollments.routes";
import courseRoutes from "./features/courses/course.routes";
import groupMessageRoutes from "./features/group_messages/g-message.routes";
import messageRoutes from "./features/messages/messages.routes";


const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

// Importing routes
app.use("/api", authRoutes);
app.use("/api", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/lists", tutorsRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/group-messages", groupMessageRoutes);
app.use("/api/messages", messageRoutes);


export default app;
