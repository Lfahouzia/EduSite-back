import { Router } from "express";
import { GroupMessageController } from "./g-message.controller";

const router = Router();
const controller = new GroupMessageController();

router.post("/", controller.create.bind(controller));
router.get("/", controller.list.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
