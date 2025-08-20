import pool from "../../shared/lib/db.client";
import { Permission, CreatePermissionDTO } from "./permission.model";

export class PermissionRepository {
  async create(data: CreatePermissionDTO): Promise<Permission> {
    const result = await pool.query(
      `INSERT INTO permissions (name, description) VALUES ($1,$2) RETURNING *;`,
      [data.name, data.description || null]
    );
    return result.rows[0];
  }

  async findAll(): Promise<Permission[]> {
    const result = await pool.query(
      "SELECT * FROM permissions ORDER BY created_at DESC;"
    );
    return result.rows;
  }

  async update(
    id: string,
    data: Partial<CreatePermissionDTO>
  ): Promise<Permission | null> {
    const result = await pool.query(
      `UPDATE permissions
       SET name=COALESCE($1, name),
           description=COALESCE($2, description)
       WHERE id=$3
       RETURNING *;`,
      [data.name || null, data.description || null, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await pool.query("DELETE FROM permissions WHERE id=$1;", [
      id,
    ]);
    return result.rowCount !== null && result.rowCount > 0;
  }
    async findById(id: string): Promise<Permission | null> {
        const result = await pool.query("SELECT * FROM permissions WHERE id=$1;", [
        id,
        ]);
        return result.rows[0] || null;
    }
    
}
