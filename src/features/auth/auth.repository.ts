import pool from "../../shared/lib/db.client";  
import { User, CreateUserDTO, UpdateUserDTO } from "./auth.model";



export class AuthRepository {
  async createUser(data: CreateUserDTO): Promise<User> {
    const query = `
      INSERT INTO users (first_name, last_name, email, password, cover_letter, cv, picture)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *;
    `;
    const values = [
      data.first_name,
      data.last_name,
      data.email,
      data.password,
      data.cover_letter || null,
      data.cv || null,
      data.picture || null,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getUsers(): Promise<User[]> {
    const result = await pool.query(
      "SELECT * FROM users ORDER BY created_at DESC;"
    );
    return result.rows;
  }

  async getUserById(id: string): Promise<User | null> {
    const result = await pool.query("SELECT * FROM users WHERE id = $1;", [id]);
    return result.rows[0] || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      `
      SELECT 
        u.*,
        json_agg(DISTINCT jsonb_build_object(
          'id', r.id,
          'name', r.name,
          'description', r.description,
          'permissions', rp.perms
        )) FILTER (WHERE r.id IS NOT NULL) AS roles
      FROM users u
      LEFT JOIN user_role ur ON ur.user_id = u.id
      LEFT JOIN roles r ON r.id = ur.role_id
      LEFT JOIN (
        SELECT rp.role_id, json_agg(jsonb_build_object(
          'id', p.id,
          'name', p.name,
          'description', p.description
        )) AS perms
        FROM role_permission rp
        JOIN permissions p ON p.id = rp.permission_id
        GROUP BY rp.role_id
      ) rp ON rp.role_id = r.id
      WHERE u.email = $1
      GROUP BY u.id;
      `,
      [email]
    );

    return result.rows[0] || null;
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User | null> {
    const query = `
      UPDATE users
      SET first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          email = COALESCE($3, email),
          password = COALESCE($4, password),
          cover_letter = COALESCE($5, cover_letter),
          cv = COALESCE($6, cv),
          picture = COALESCE($7, picture),
          status = COALESCE($8, status),
          updated_at = NOW()
      WHERE id = $9
      RETURNING *;
    `;
    const values = [
      data.first_name || null,
      data.last_name || null,
      data.email || null,
      data.password || null,
      data.cover_letter || null,
      data.cv || null,
      data.picture || null,
      data.status ?? null,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await pool.query("DELETE FROM users WHERE id = $1;", [id]);
    if (result.rowCount === null) {
      return false; // No user was deleted
    }
    return result.rowCount > 0;
  }
}
