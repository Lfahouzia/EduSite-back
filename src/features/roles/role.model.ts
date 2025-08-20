export interface Role {
  id: string;
  name: string;
  description?: string;
  status?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateRoleDTO {
  name: string;
  description?: string;
}

export interface UpdateRoleDTO {
  name?: string;
  description?: string;
  status?: boolean;
}
