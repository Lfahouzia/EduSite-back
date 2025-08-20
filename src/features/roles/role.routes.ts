import { Router } from "express";
import { RoleController } from "./role.controller";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";

const router = Router();
const controller = new RoleController();

// 🔹 CRUD roles
router.post(
  "/roles/",
  authMiddleware,
  adminMiddleware,
  controller.create.bind(controller)
);

router.get(
  "/roles/",
  authMiddleware,
  adminMiddleware,
  controller.findAll.bind(controller)
);

router.put(
  "/roles/:id",
  authMiddleware,
  adminMiddleware,
  controller.update.bind(controller)
);

router.delete(
  "/roles/:id",
  authMiddleware,
  adminMiddleware,
  controller.delete.bind(controller)
);

// 🔹 Permissions (bulk)
router.post(
  "/roles/permissions/assign",
  authMiddleware,
  adminMiddleware,
  controller.assignPermissionsBulk.bind(controller)
);
router.post(
  "/roles/permissions/revoke",
  authMiddleware,
  adminMiddleware,
  controller.revokePermissionsBulk.bind(controller)
);

// 🔹 Roles <-> Users (bulk)
router.post(
  "/users/roles/assign",
  authMiddleware,
  adminMiddleware,
  controller.assignRolesToUserBulk.bind(controller)
);
router.post(
  "/users/roles/revoke",
  authMiddleware,
  adminMiddleware,
  controller.revokeRolesFromUserBulk.bind(controller)
);


export default router;
