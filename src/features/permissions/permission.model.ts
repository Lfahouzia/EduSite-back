export interface Permission {
  id: string;
  name: string;
  description?: string;
  created_at?: Date;
}

export interface CreatePermissionDTO {
  name: string;
  description?: string;
}
