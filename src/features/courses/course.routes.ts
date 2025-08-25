import { Router } from "express";
import { CourseController } from "./course.controller";

const router = Router();
const courseController = new CourseController();

router.post("/", courseController.create.bind(courseController));
router.get("/", courseController.list.bind(courseController));
router.get("/:id", courseController.getById.bind(courseController));
router.put("/:id", courseController.update.bind(courseController));
router.patch("/:id/publish", courseController.publish.bind(courseController));
router.patch("/:id/archive", courseController.archive.bind(courseController));
// router.delete("/:id", courseController.delete.bind(courseController));

export default router;
