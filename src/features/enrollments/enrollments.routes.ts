import { Router } from "express";
import { EnrollmentController } from "./enrollments.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";
import { studentMiddleware } from "../../shared/middlewares/student.middleware";

const router = Router();
const controller = new EnrollmentController();

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  controller.create.bind(controller)
);
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  controller.list.bind(controller)
);
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.getById.bind(controller)
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.update.bind(controller)
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.delete.bind(controller)
);

router.get(
  "/:courseId/courses",
  authMiddleware,
  adminMiddleware,
  controller.listByCourse.bind(controller)
);
router.get(
  "/user/:userId",
  authMiddleware,
  adminMiddleware,
  controller.listByUser.bind(controller)
);
router.patch(
  "/:id/feedback",
  authMiddleware,
  studentMiddleware,
  controller.addFeedback.bind(controller)
);

export default router;
