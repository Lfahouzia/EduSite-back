import { Router } from "express";
import { RoleController } from "./role.controller";

const router = Router();
const controller = new RoleController();

// 🔹 CRUD roles
router.post("/", controller.create.bind(controller));
router.get("/", controller.findAll.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

// 🔹 Permissions (bulk)
router.post(
  "/permissions/bulk/assign",
  controller.assignPermissionsBulk.bind(controller)
);
router.post(
  "/permissions/bulk/revoke",
  controller.revokePermissionsBulk.bind(controller)
);

// 🔹 Roles <-> Users (bulk)
router.post(
  "/users/bulk/assign",
  controller.assignRolesToUserBulk.bind(controller)
);
router.post(
  "/users/bulk/revoke",
  controller.revokeRolesFromUserBulk.bind(controller)
);

export default router;
