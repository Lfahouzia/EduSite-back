// src/modules/tutor/tutor.service.ts
import { TutorRepository } from "./turo.repository"; 
import { TutorStatus, User, UserRole } from "./tutor.model";

export class TutorService {
  private tutorRepo: TutorRepository;

  constructor() {
    this.tutorRepo = new TutorRepository();
  }

  async listTutors(status: UserRole): Promise<User[]> {
    return this.tutorRepo.findAllTutors(status);
  }

  async changeStatus(id: string, status: TutorStatus): Promise<User | null> {
    return this.tutorRepo.updateTutorStatus(id, status);
  }
}
