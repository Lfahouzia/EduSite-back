export interface Course {
  id: string;
  title: string;
  price: number;
  description?: string;
  published_date?: Date;
  certificate_text?: string;
  status: "draft" | "published" | "archived";
  tutor_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCourseDTO {
  title: string;
  price: number;
  description?: string;
  certificate_text?: string;
  tutor_id: string;
}

export interface UpdateCourseDTO {
  title?: string;
  price?: number;
  description?: string;
  certificate_text?: string;
  status?: "draft" | "published" | "archived";
}
