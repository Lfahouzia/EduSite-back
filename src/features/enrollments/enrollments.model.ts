export interface Enrollment {
  id: string;
  enrollment_date: Date;
  average_score: number | null;
  status: "active" | "completed" | "dropped";
  feedback: string | null;
  user_id: string;
  course_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateEnrollmentDTO {
  user_id: string;
  course_id: string;
  feedback?: string;
}

export interface UpdateEnrollmentDTO {
  average_score?: number;
  status?: "active" | "completed" | "dropped";
  feedback?: string;
}
