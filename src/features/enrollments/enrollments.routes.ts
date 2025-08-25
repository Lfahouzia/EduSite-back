import { Router } from "express";
import { EnrollmentController } from "./enrollments.controller";

const router = Router();
const controller = new EnrollmentController();

router.post("/", controller.create.bind(controller));
router.get("/", controller.list.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

router.get("/course/:courseId", controller.listByCourse.bind(controller));
router.get("/user/:userId", controller.listByUser.bind(controller));

export default router;
