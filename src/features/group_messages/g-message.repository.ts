import db from "../../shared/lib/db.client";
import {
  GroupMessage,
  CreateGroupMessageDTO,
  UpdateGroupMessageDTO,
} from "./g-message.model";

export class GroupMessageRepository {
  async create(data: CreateGroupMessageDTO): Promise<GroupMessage> {
    const query = `
      INSERT INTO group_messages (topic, course_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [data.topic, data.course_id];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async findAll(): Promise<GroupMessage[]> {
    const result = await db.query(
      "SELECT * FROM group_messages ORDER BY created_at DESC;"
    );
    return result.rows;
  }

  async findById(id: string): Promise<GroupMessage | null> {
    const result = await db.query(
      "SELECT * FROM group_messages WHERE id = $1;",
      [id]
    );
    return result.rows[0] || null;
  }

  async update(
    id: string,
    data: UpdateGroupMessageDTO
  ): Promise<GroupMessage | null> {
    const query = `
      UPDATE group_messages
      SET topic = COALESCE($1, topic),
          updated_at = NOW()
      WHERE id = $2
      RETURNING *;
    `;
    const values = [data.topic ?? null, id];
    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.query("DELETE FROM group_messages WHERE id = $1;", [
      id,
    ]);
    return result.rowCount ?  result.rowCount > 0 : false;
  }
}
