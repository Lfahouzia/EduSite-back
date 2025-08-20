export interface Permission {
  id: string;
  name: string;
  description?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions?: Permission[];
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  cover_letter?: string;
  cv?: string;
  picture?: string;
  created_at?: Date;
  updated_at?: Date;
  roles?: Role[]; // ✅ Ajouté ici
}

export interface CreateUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  cover_letter?: string;
  cv?: string;
  picture?: string;
}

export interface UpdateUserDTO {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  cover_letter?: string;
  cv?: string;
  picture?: string;
  status?: boolean;
}
