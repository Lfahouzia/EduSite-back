// src/modules/tutor/tutor.controller.ts
import { Request, Response } from "express";
import { TutorService } from "./tutor.service";
import { HTTP_STATUS } from "../../shared/config/httpStatus";
import { getMissingFields } from "../../shared/utils/validators";
import {  UserRole } from "./tutor.model";

export class TutorController {
  private tutorService: TutorService;

  constructor() {
    this.tutorService = new TutorService();
  }

  async listTutors(req: Request, res: Response) {
    const { role } = req.query;
    // Vérifier que le role est valide
    if (
      !role ||
      !Object.values(UserRole).includes(role as UserRole)
    ) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Invalid role. Allowed values: admin, tutor, student",
      });
    }

    // Convertir le string en enum
    const tutorRole: UserRole = role as UserRole;

    const tutors = await this.tutorService.listTutors(tutorRole);
    return res.json({ data: tutors, message: "Lists fetched successfully" });
  }

  async updateTutorStatus(req: Request, res: Response) {
    const requiredFields = ["id", "status"];
    const missingFields = getMissingFields(req.body, requiredFields);
    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Missing required fields",
      });
    }
    const { status, id } = req.body;

    if (!id) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Tutor ID is required" });
    }

    if (!status || !["active", "blocked", "pending"].includes(status)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Invalid status. Allowed values: active, blocked, pending",
      });
    }

    try {
      const tutor = await this.tutorService.changeStatus(id, status);

      return tutor
        ? res.json(tutor)
        : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Tutor not found" });
    } catch (error) {
      return res
        .status(HTTP_STATUS.INTERNAL_ERROR)
        .json({ error: "An error occurred while updating tutor status" });
    }
  }
}
