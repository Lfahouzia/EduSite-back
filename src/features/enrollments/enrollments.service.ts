import { EnrollmentRepository } from "./enrollments.repository";
import { CreateEnrollmentDTO, UpdateEnrollmentDTO } from "./enrollments.model";

export class EnrollmentService {
  private repo: EnrollmentRepository;

  constructor() {
    this.repo = new EnrollmentRepository();
  }

  create(data: CreateEnrollmentDTO) {
    return this.repo.create(data);
  }

  list() {
    return this.repo.list();
  }

  getById(id: string) {
    return this.repo.getById(id);
  }

  update(id: string, data: UpdateEnrollmentDTO) {
    return this.repo.update(id, data);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }

  listByCourse(courseId: string) {
    return this.repo.listByCourse(courseId);
  }

  listByUser(userId: string) {
    return this.repo.listByUser(userId);
  }

  async addFeedback(enrollmentId: string, feedback: string) {
    const enrollment = await this.repo.getById(enrollmentId);
    if (!enrollment) {
      throw new Error("Enrollment not found");
    }
    const updatedEnrollment = await this.repo.addFeedback(enrollmentId, feedback );
    return updatedEnrollment;
  }
}
