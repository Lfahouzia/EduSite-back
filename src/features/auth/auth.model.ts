export interface User {
  id: string;
  first_name: string;
  last_name: string;
  status?: boolean;
  email: string;
  password: string;
  cover_letter?: string;
  cv?: string;
  picture?: string;
  created_at?: Date;
  updated_at?: Date;
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
