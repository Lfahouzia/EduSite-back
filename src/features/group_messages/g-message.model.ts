export interface GroupMessage {
  id: string;
  topic: string;
  course_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateGroupMessageDTO {
  topic: string;
  course_id: string;
}

export interface UpdateGroupMessageDTO {
  topic?: string;
}
