import pool from "../../shared/lib/db.client";
import { User, UserRole } from "./tutor.model";

export class TutorRepository {
  async findAllTutors(role: UserRole): Promise<User[]> {

    const result = await pool.query(
      ` SELECT 
            u.id,
            u.first_name,
            u.last_name,
            u.email,
            u.status,
            u.created_at,
            u.updated_at
        FROM users u
        JOIN user_role ur ON ur.user_id = u.id
        JOIN roles r ON r.id = ur.role_id
        WHERE r.name = $1;
    `,
      [role]
    );

    return result.rows;
  }

  async updateTutorStatus(
    id: string,
    status: "active" | "blocked" | "pending"
  ) {
    const result = await pool.query(
      `UPDATE users SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *;`,
      [status, id]
    );
    return result.rows[0] || null;
  }
}
