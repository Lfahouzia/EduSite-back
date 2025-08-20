import { Router } from "express";
import { PermissionController } from "./permission.controller";

const router = Router();
const controller = new PermissionController();

// 🔹 CRUD permissions
router.post("/", controller.create.bind(controller));
router.get("/", controller.findAll.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.get("/:id", controller.findById.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
