import { Router } from "express";
import { CourseController } from "./course.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { tutorMiddleware } from "../../shared/middlewares/tutor.middleware";

const router = Router();
const courseController = new CourseController();

router.post(
  "/",
  authMiddleware,
  tutorMiddleware,
  courseController.create.bind(courseController)
);
router.get("/", courseController.list.bind(courseController));
router.get("/:id", courseController.getById.bind(courseController));
router.put(
  "/:id",
  authMiddleware,
  tutorMiddleware,
  courseController.update.bind(courseController)
);
router.patch(
  "/:id/publish",
  authMiddleware,
  tutorMiddleware,
  courseController.publish.bind(courseController)
);
router.patch(
  "/:id/archive",
  authMiddleware,
  tutorMiddleware,
  courseController.archive.bind(courseController)
);
// router.delete("/:id", courseController.delete.bind(courseController));

export default router;
