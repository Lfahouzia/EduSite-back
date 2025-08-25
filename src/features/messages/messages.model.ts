export interface Message {
  id: string;
  content: string;
  sent_at: Date;
  receiver_id: string;
  sender_id: string;
  group_message_id: string;
  status: "sent" | "delivered" | "read";
  created_at: Date;
  updated_at: Date;
}

export interface CreateMessageDTO {
  content: string;
  receiver_id: string;
  sender_id: string;
  group_message_id: string;
}

export interface UpdateMessageDTO {
  status?: "sent" | "delivered" | "read";
  content?: string;
}
