import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();
const controller = new AuthController();

router.post("/register", controller.register.bind(controller));
router.post("/login", controller.login.bind(controller));

router.get("/", controller.getUsers.bind(controller));
router.get("/:id", controller.getUser.bind(controller));
router.put("/:id", controller.updateUser.bind(controller));
// router.delete("/:id", controller.deleteUser.bind(controller));

export default router;
