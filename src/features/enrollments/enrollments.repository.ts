import db from "../../shared/lib/db.client";
import {
  Enrollment,
  CreateEnrollmentDTO,
  UpdateEnrollmentDTO,
} from "./enrollments.model";

export class EnrollmentRepository {
  async create(data: CreateEnrollmentDTO): Promise<Enrollment> {
    const query = `
      INSERT INTO enrollments (user_id, course_id,feedback)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await db.query(query, [data.user_id, data.course_id, data.feedback || null]);
    return result.rows[0];
  }

  async list(): Promise<Enrollment[]> {
    const result = await db.query(
      "SELECT * FROM enrollments ORDER BY created_at DESC"
    );
    return result.rows;
  }

  async getById(id: string): Promise<Enrollment | null> {
    const result = await db.query("SELECT * FROM enrollments WHERE id = $1", [
      id,
    ]);
    return result.rows[0] || null;
  }

  async update(
    id: string,
    data: UpdateEnrollmentDTO
  ): Promise<Enrollment | null> {
    const query = `
      UPDATE enrollments
      SET average_score = COALESCE($1, average_score),
          status = COALESCE($2, status),
          feedback = COALESCE($3, feedback),
          updated_at = NOW()
      WHERE id = $4
      RETURNING *;
    `;
    const values = [
      data.average_score ?? null,
      data.status ?? null,
      data.feedback ?? null,
      id,
    ];
    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.query("DELETE FROM enrollments WHERE id = $1", [
      id,
    ]);
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async listByCourse(courseId: string): Promise<Enrollment[]> {
     const result = await db.query(
       `
      SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        e.status AS enrollment_status,
        e.enrollment_date,
        e.average_score,
        e.feedback
      FROM enrollments e
      INNER JOIN users u ON e.user_id = u.id
      WHERE e.course_id = $1
      ORDER BY e.enrollment_date DESC;
      `,
       [courseId]
     );
    return result.rows;
  }

  async listByUser(userId: string): Promise<Enrollment[]> {
    const result = await db.query(
      "SELECT * FROM enrollments WHERE user_id = $1",
      [userId]
    );
    return result.rows;
  }

  async addFeedback(enrollmentId: string, feedback: string): Promise<Enrollment | null> {
    const query = `
      UPDATE enrollments
      SET feedback = $1,
          updated_at = NOW()
      WHERE id = $2
      RETURNING *;
    `;
    const values = [feedback, enrollmentId];
    const result = await db.query(query, values);
    return result.rows[0] || null;
  }
}
