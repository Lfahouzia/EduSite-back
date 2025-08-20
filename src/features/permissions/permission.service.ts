import { PermissionRepository } from "./permission.repository";
import { Permission, CreatePermissionDTO } from "./permission.model";

export class PermissionService {
  private repo = new PermissionRepository();

  async create(data: CreatePermissionDTO): Promise<Permission> {
    if (!data.name) throw new Error("Permission name is required");
    return this.repo.create(data);
  }

  async findAll(): Promise<Permission[]> {
    return this.repo.findAll();
  }

  async update(
    id: string,
    data: Partial<CreatePermissionDTO>
  ): Promise<Permission | null> {
    return this.repo.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
  async findById(id: string): Promise<Permission | null> {
    return this.repo.findById(id);
  }
}
