import pool from "../../shared/lib/db.client";
import { Course, CreateCourseDTO, UpdateCourseDTO } from "./course.model";

export class CourseRepository {
  async create(data: CreateCourseDTO): Promise<Course> {
    const query = `
      INSERT INTO courses (title, price, description, certificate_texte, tutor_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      data.title,
      data.price,
      data.description || null,
      data.certificate_text || null,
      data.tutor_id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll(): Promise<Course[]> {
    const result = await pool.query(
      "SELECT * FROM courses ORDER BY created_at DESC;"
    );
    return result.rows;
  }

  async findById(id: string): Promise<Course | null> {
    const result = await pool.query("SELECT * FROM courses WHERE id = $1;", [
      id,
    ]);
    return result.rows[0] || null;
  }

  async update(id: string, data: UpdateCourseDTO): Promise<Course | null> {
    const query = `
      UPDATE courses
      SET title = COALESCE($1, title),
          price = COALESCE($2, price),
          description = COALESCE($3, description),
          certificate_texte = COALESCE($4, certificate_texte),
          status = COALESCE($5, status),
          updated_at = NOW()
      WHERE id = $6
      RETURNING *;
    `;
    const values = [
      data.title || null,
      data.price || null,
      data.description || null,
      data.certificate_text || null,
      data.status || null,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

//   async delete(id: string): Promise<boolean> {
//     const result = await pool.query("DELETE FROM courses WHERE id = $1;", [id]);
//     return (result.rowCount ?? 0) > 0;
//   }
}
