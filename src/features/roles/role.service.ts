import { RoleRepository } from "./role.repository";
import { CreateRoleDTO, UpdateRoleDTO, Role } from "./role.model";

class RoleServiceImpl {
  private repo = new RoleRepository();

  async create(data: CreateRoleDTO): Promise<Role> {
    return this.repo.create(data);
  }

  async findAll(): Promise<Role[]> {
    return this.repo.findAll();
  }

  async update(id: string, data: UpdateRoleDTO): Promise<Role | null> {
    return this.repo.update(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }

  //  Bulk assign/revoke permissions
  async assignPermissions(roleId: string, permissionIds: string[]) {
    return this.repo.assignPermissions(roleId, permissionIds);
  }

  async revokePermissions(roleId: string, permissionIds: string[]) {
    return this.repo.revokePermissions(roleId, permissionIds);
  }

  //  Bulk assign/revoke roles to user
  async assignRolesToUser(userId: string, roleIds: string[]) {
    return this.repo.assignRolesToUser(userId, roleIds);
  }

  async revokeRolesFromUser(userId: string, roleIds: string[]) {
    return this.repo.revokeRolesFromUser(userId, roleIds);
  }
}

// 🔹 Proxy pour validation et contrôle
export class RoleServiceProxy {
  private service = new RoleServiceImpl();

  async create(data: CreateRoleDTO) {
    if (!data.name) throw new Error("Role name required");
    return this.service.create(data);
  }

  //  Bulk assign avec validation (exemple : pas assigner si rôle inactif)
  async assignPermissions(roleId: string, permissionIds: string[]) {
    const roles = await this.service.findAll();
    const role = roles.find((r) => r.id === roleId);
    if (role && role.status === false) {
      throw new Error("Cannot assign permissions to inactive role");
    }
    return this.service.assignPermissions(roleId, permissionIds);
  }

  async revokePermissions(roleId: string, permissionIds: string[]) {
    return this.service
      .revokePermissions(roleId, permissionIds)
      .catch((err) => {
        if (err.message.includes("foreign key constraint")) {
          throw new Error("Cannot revoke permissions that are in use by roles");
        }
      });;
  }

  async assignRolesToUser(userId: string, roleIds: string[]) {
    try {
      
      return this.service.assignRolesToUser(userId, roleIds);
    } catch (error:any) {
      throw new Error("Error assigning roles to user: " + error.message);
      
    }
  }

  async revokeRolesFromUser(userId: string, roleIds: string[]) {
    return this.service.revokeRolesFromUser(userId, roleIds);
  }

  async findAll() {
    return this.service.findAll();
  }

  async update(id: string, data: UpdateRoleDTO) {

    try {
      
      return this.service.update(id, data);
    } catch (error:any) {
      throw new Error("Error updating role: " + error.message);
      
    }
  }

  async delete(id: string) {
    try {
      return this.service.delete(id);
      
    } catch (error: any) {
      throw new Error("Error deleting role: " + error.message);
      
    }
  }
}
