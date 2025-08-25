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
     const result = await pool.query(
       `
      SELECT 
          c.*,
          json_agg(jsonb_build_object(
            'id', u.id,
            'first_name', u.first_name,
            'last_name', u.last_name
          )) FILTER (WHERE u.id IS NOT NULL) AS students
      FROM courses c
      LEFT JOIN enrollments e ON c.id = e.course_id
      LEFT JOIN users u ON e.user_id = u.id
      WHERE c.id = $1
      GROUP BY c.id;
      `,
       [id]
     );
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

  async publishCousrse(id: string): Promise<Course | null> {
    const query = `
      UPDATE courses
      SET status = 'published',
          published_date = NOW(),
          updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  async archiveCourse(id: string): Promise<Course | null> {
    const query = `
      UPDATE courses
      SET status = 'archived',
          updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  //   async delete(id: string): Promise<boolean> {
  //     const result = await pool.query("DELETE FROM courses WHERE id = $1;", [id]);
  //     return (result.rowCount ?? 0) > 0;
  //   }
}
