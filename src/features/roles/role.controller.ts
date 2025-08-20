import { Request, Response } from "express";
import { RoleServiceProxy } from "./role.service";
import { HTTP_STATUS } from "../../shared/config/httpStatus";
import { getMissingFields } from "../../shared/utils/validators";

const service = new RoleServiceProxy();

export class RoleController {
  async create(req: Request, res: Response) {

    const data = req.body;
    const requiredFields = ["name", "description"];
    const missingFields = getMissingFields(data, requiredFields);
    
    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Missing required fields",
      });
    }

    try {
      const role = await service.create(req.body);
      res.status(HTTP_STATUS.CREATED).json(role);
    } catch (err: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
    }
  }

  async findAll(_req: Request, res: Response) {
    const roles = await service.findAll();
    res.json(roles);
  }

  async update(req: Request, res: Response) {
    const role = await service.update(req.params.id, req.body);
    res.json(role);
  }

  async delete(req: Request, res: Response) {
    const success = await service.delete(req.params.id);
    res.json({ success });
  }

  // -------------------------
  // 🔹 Permissions <-> Roles
  // -------------------------
  async assignPermissionsBulk(req: Request, res: Response) {
    const { roleId, permissionIds } = req.body; // JSON { roleId, permissionIds: [] }
    await service.assignPermissions(roleId, permissionIds);
    res.json({
      message: "Permissions assigned in bulk",
      count: permissionIds.length,
    });
  }

  async revokePermissionsBulk(req: Request, res: Response) {
    const { roleId, permissionIds } = req.body;
    await service.revokePermissions(roleId, permissionIds);
    res.json({
      message: "Permissions revoked in bulk",
      count: permissionIds.length,
    });
  }

  // -------------------------
  // 🔹 Roles <-> Users
  // -------------------------
  async assignRolesToUserBulk(req: Request, res: Response) {
    const { userId, roleIds } = req.body; // JSON { userId, roleIds: [] }
    await service.assignRolesToUser(userId, roleIds);
    res.json({
      message: "Roles assigned to user in bulk",
      count: roleIds.length,
    });
  }

  async revokeRolesFromUserBulk(req: Request, res: Response) {
    const { userId, roleIds } = req.body;
    await service.revokeRolesFromUser(userId, roleIds);
    res.json({
      message: "Roles revoked from user in bulk",
      count: roleIds.length,
    });
  }
}
