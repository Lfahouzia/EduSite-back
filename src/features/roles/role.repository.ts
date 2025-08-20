import pool from "../../shared/lib/db.client";
import { Role, CreateRoleDTO, UpdateRoleDTO } from "./role.model";

export class RoleRepository {
  async create(data: CreateRoleDTO): Promise<Role> {
    const result = await pool.query(
      `INSERT INTO roles (name, description) VALUES ($1,$2) RETURNING *;`,
      [data.name, data.description || null]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Role[]> {
    const result = await pool.query(
      "SELECT * FROM roles ORDER BY created_at DESC;"
    );
    return result.rows;
  }

  async findById(id: string): Promise<Role | null> {
    const result = await pool.query("SELECT * FROM roles WHERE id=$1;", [id]);
    return result.rows[0] || null;
  }

  async update(id: string, data: UpdateRoleDTO): Promise<Role | null> {
    const result = await pool.query(
      `UPDATE roles
       SET name=COALESCE($1,name),
           description=COALESCE($2,description),
           status=COALESCE($3,status),
           updated_at=NOW()
       WHERE id=$4 RETURNING *;`,
      [data.name || null, data.description || null, data.status ?? null, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await pool.query("DELETE FROM roles WHERE id=$1;", [id]);
    return (result.rowCount ?? 0) > 0;
  }

  /**
   * ➕ Assigner plusieurs permissions à un rôle
   */
  async assignPermissions(roleId: string, permissionIds: string[]) {
    if (permissionIds.length === 0) return;

    const values: any[] = [roleId];
    const placeholders = permissionIds
      .map((_, idx) => {
        values.push(permissionIds[idx]);
        return `($1, $${idx + 2})`;
      })
      .join(", ");

    const query = `
      INSERT INTO role_permission (role_id, permission_id)
      VALUES ${placeholders}
      ON CONFLICT DO NOTHING;
    `;
    await pool.query(query, values);
  }

  /**
   * ➖ Révoquer plusieurs permissions d’un rôle
   */
  async revokePermissions(roleId: string, permissionIds: string[]) {
    if (permissionIds.length === 0) return;

    const placeholders = permissionIds
      .map((_, idx) => `$${idx + 2}`)
      .join(", ");
    const values = [roleId, ...permissionIds];

    const query = `
      DELETE FROM role_permission 
      WHERE role_id = $1 AND permission_id IN (${placeholders});
    `;
    await pool.query(query, values);
  }

  /**
   * ➕ Assigner plusieurs rôles à un user
   */
  async assignRolesToUser(userId: string, roleIds: string[]) {
    if (roleIds.length === 0) return;

    const values: any[] = [userId];
    const placeholders = roleIds
      .map((_, idx) => {
        values.push(roleIds[idx]);
        return `($${idx + 2}, $1)`; // ⚠️ userId devient $1
      })
      .join(", ");

    const query = `
      INSERT INTO user_role (role_id, user_id)
      VALUES ${placeholders}
      ON CONFLICT DO NOTHING;
    `;
    await pool.query(query, values);
  }

  /**
   * ➖ Révoquer plusieurs rôles d’un user
   */
  async revokeRolesFromUser(userId: string, roleIds: string[]) {
    if (roleIds.length === 0) return;

    const placeholders = roleIds.map((_, idx) => `$${idx + 2}`).join(", ");
    const values = [userId, ...roleIds];

    const query = `
      DELETE FROM user_role 
      WHERE user_id = $1 AND role_id IN (${placeholders});
    `;
    await pool.query(query, values);
  }
}
