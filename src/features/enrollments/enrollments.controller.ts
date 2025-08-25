import { Request, Response } from "express";
import { EnrollmentService } from "./enrollments.service";
import { HTTP_STATUS } from "../../shared/config/httpStatus";

export class EnrollmentController {
  private service: EnrollmentService;

  constructor() {
    this.service = new EnrollmentService();
  }

  async create(req: Request, res: Response) {
    try {
      const enrollment = await this.service.create(req.body);
      return res.status(HTTP_STATUS.CREATED).json(enrollment);
    } catch (err) {
      return res
        .status(HTTP_STATUS.INTERNAL_ERROR)
        .json({ error: "Error creating enrollment" });
    }
  }

  async list(_req: Request, res: Response) {
    const enrollments = await this.service.list();
    return res.json(enrollments);
  }

  async getById(req: Request, res: Response) {
    const enrollment = await this.service.getById(req.params.id);
    return enrollment
      ? res.json(enrollment)
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: "Enrollment not found" });
  }

  async update(req: Request, res: Response) {
    const enrollment = await this.service.update(req.params.id, req.body);
    return enrollment
      ? res.json(enrollment)
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: "Enrollment not found" });
  }

  async delete(req: Request, res: Response) {
    const deleted = await this.service.delete(req.params.id);
    return deleted
      ? res.json({ message: "Enrollment deleted" })
      : res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ error: "Enrollment not found" });
  }

  async listByCourse(req: Request, res: Response) {
    const enrollments = await this.service.listByCourse(req.params.courseId);
    return res.json(enrollments);
  }

  async listByUser(req: Request, res: Response) {
    const enrollments = await this.service.listByUser(req.params.userId);
    return res.json(enrollments);
  }
}
