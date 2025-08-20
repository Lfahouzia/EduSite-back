import { Router } from "express";
import { RoleController } from "./role.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";

const router = Router();
const controller = new RoleController();

// 🔹 CRUD roles
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
  controller.findAll.bind(controller)
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

// 🔹 Permissions (bulk)
router.post(
  "/permissions/bulk/assign",
  authMiddleware,
  adminMiddleware,
  controller.assignPermissionsBulk.bind(controller)
);
router.post(
  "/permissions/bulk/revoke",
  authMiddleware,
  adminMiddleware,
  controller.revokePermissionsBulk.bind(controller)
);

// 🔹 Roles <-> Users (bulk)
router.post(
  "/users/bulk/assign",
  authMiddleware,
  adminMiddleware,
  controller.assignRolesToUserBulk.bind(controller)
);
router.post(
  "/users/bulk/revoke",
  authMiddleware,
  adminMiddleware,
  controller.revokeRolesFromUserBulk.bind(controller)
);


export default router;
