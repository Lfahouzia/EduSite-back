import db from "../../shared/lib/db.client";
import { Message, CreateMessageDTO, UpdateMessageDTO } from "./messages.model";

export class MessageRepository {
  async create(data: CreateMessageDTO): Promise<Message> {
    const query = `
      INSERT INTO messages (content, receiver_id, sender_id, group_message_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [
      data.content,
      data.receiver_id,
      data.sender_id,
      data.group_message_id,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async list(): Promise<Message[]> {
    const result = await db.query(
      "SELECT * FROM messages ORDER BY created_at DESC"
    );
    return result.rows;
  }

  async getById(id: string): Promise<Message | null> {
    const result = await db.query("SELECT * FROM messages WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  async update(id: string, data: UpdateMessageDTO): Promise<Message | null> {
    const query = `
      UPDATE messages
      SET content = COALESCE($1, content),
          status = COALESCE($2, status),
          updated_at = NOW()
      WHERE id = $3
      RETURNING *;
    `;
    const values = [data.content || null, data.status || null, id];
    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.query("DELETE FROM messages WHERE id = $1", [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }
}
