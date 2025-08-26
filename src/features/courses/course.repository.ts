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

  // async findAll(
  //   page: number = 1,
  //   limit: number = 10,
  //   sort: string = "created_at",
  //   order: "asc" | "desc" = "desc",
  //   filters: { status?: string; tutorId?: string; title?: string } = {}
  // ): Promise<{ data: Course[]; total: number }> {
  //   const offset = (page - 1) * limit;
  //   const values: any[] = [];
  //   let whereClauses: string[] = [];

  //   if (filters.status) {
  //     values.push(filters.status);
  //     whereClauses.push(`status = $${values.length}`);
  //   }
  //   if (filters.tutorId) {
  //     values.push(filters.tutorId);
  //     whereClauses.push(`tutor_id = $${values.length}`);
  //   }
  //   if (filters.title) {
  //     values.push(`%${filters.title}%`);
  //     whereClauses.push(`title ILIKE $${values.length}`);
  //   }

  //   const whereSQL =
  //     whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  //   // Count total for pagination
  //   const countResult = await pool.query(
  //     `SELECT COUNT(*) FROM courses ${whereSQL};`,
  //     values
  //   );
  //   const total = parseInt(countResult.rows[0].count, 10);

  //   // Data query
  //   const result = await pool.query(
  //     `
  //     SELECT *
  //     FROM courses
  //     ${whereSQL}
  //     ORDER BY ${sort} ${order}
  //     LIMIT ${limit} OFFSET ${offset};
  //     `,
  //     values
  //   );

  //   return { data: result.rows, total };
  // }
  async findAll(
    page: number = 1,
    limit: number = 10,
    sort: string = "c.created_at",
    order: "asc" | "desc" = "desc",
    filters: { status?: string; tutor_name?: string; title?: string } = {}
  ): Promise<{ data: Course[]; total: number }> {
    const offset = (page - 1) * limit;
    const values: any[] = [];
    let whereClauses: string[] = [];

    // Filtre par statut du cours
    if (filters.status) {
      values.push(filters.status);
      whereClauses.push(`c.status = $${values.length}`);
    }

    // Filtre par nom du tuteur
    if (filters.tutor_name) {
      values.push(`%${filters.tutor_name}%`);
      whereClauses.push(
        `(u.first_name || ' ' || u.last_name) ILIKE $${values.length}`
      );
    }

    // Filtre par titre de cours
    if (filters.title) {
      values.push(`%${filters.title}%`);
      whereClauses.push(`c.title ILIKE $${values.length}`);
    }

    const whereSQL =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    // Count total for pagination
    const countResult = await pool.query(
      `
      SELECT COUNT(*) 
      FROM courses c
      LEFT JOIN users u ON c.tutor_id = u.id
      ${whereSQL};
      `,
      values
    );
    const total = parseInt(countResult.rows[0].count, 10);

    // Data query
    const result = await pool.query(
      `
      SELECT 
        c.id,
        c.title,
        c.price,
        c.description,
        c.published_date,
        c.certificate_texte,
        c.status,
        c.created_at,
        c.updated_at,
        (u.first_name || ' ' || u.last_name) AS tutor_name
      FROM courses c
      LEFT JOIN users u ON c.tutor_id = u.id
      ${whereSQL}
      ORDER BY ${sort} ${order}
      LIMIT ${limit} OFFSET ${offset};
      `,
      values
    );

    return { data: result.rows, total };
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
