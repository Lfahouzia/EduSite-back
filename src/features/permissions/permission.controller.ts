import { Request, Response } from "express";
import { PermissionService } from "./permission.service";

const service = new PermissionService();

export class PermissionController {
  async create(req: Request, res: Response) {
    try {
      const permission = await service.create(req.body);
      res.status(201).json(permission);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async findAll(_req: Request, res: Response) {
    const permissions = await service.findAll();
    res.json(permissions);
  }

  async findById(req: Request, res: Response) {
    const permission = await service.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }
    res.json(permission);
  }

  async update(req: Request, res: Response) {
    try {
      const permission = await service.update(req.params.id, req.body);
      if (!permission) {
        return res.status(404).json({ error: "Permission not found" });
      }
      res.json(permission);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    const success = await service.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Permission not found" });
    }
    res.json({ success });
  }
}
