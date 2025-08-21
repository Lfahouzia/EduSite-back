// src/modules/user/user.model.ts
export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student",
  TUTOR = "tutor",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole[];
  tutorStatus?: TutorStatus; // si TUTOR
}

export enum TutorStatus {
  ACTIVE = "active",
  BLOCKED = "blocked",
  PENDING = "pending",
}
