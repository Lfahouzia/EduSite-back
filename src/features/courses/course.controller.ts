import { Request, Response } from "express";
import { CourseService } from "./course.service";
import { HTTP_STATUS } from "../../shared/config/httpStatus";
import { getMissingFields } from "../../shared/utils/validators";

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  async create(req: Request, res: Response) {
    const data = req.body;
    const requiredFields = ["title", "description", "price", "tutor_id"];
    const missingFields = getMissingFields(data, requiredFields);
    if (missingFields.length > 0) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: "Missing required fields",
        missingFields,
      });
    }
    try {
      const course = await this.courseService.createCourse(req.body);
      res.status(HTTP_STATUS.CREATED).json(course);
    } catch (error) {
      res
        .status(HTTP_STATUS.INTERNAL_ERROR)
        .json({ error: "Failed to create course" });
    }
  }

  async list(_req: Request, res: Response) {
    const courses = await this.courseService.listCourses();
    res.json({ data: courses, message: "Courses retrieved successfully" });
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const course = await this.courseService.getCourseById(id);
    return course
      ? res.json(course)
      : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Course not found" });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const course = await this.courseService.updateCourse(id, req.body);
    return course
      ? res.json(course)
      : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Course not found" });
  }

  async publish(req: Request, res: Response) {
    const { id } = req.params;
    const course = await this.courseService.publishCourse(id);
    return course
      ? res.json(course)
      : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Course not found" });
  }

  async archive(req: Request, res: Response) {
    const { id } = req.params;
    const course = await this.courseService.archiveCourse(id);
    return course
      ? res.json(course)
      : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Course not found" });
  }

  //   async delete(req: Request, res: Response) {
  //     const { id } = req.params;
  //     const deleted = await this.courseService.deleteCourse(id);
  //     return deleted
  //       ? res.json({ message: "Course deleted successfully" })
  //       : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Course not found" });
  //   }
}
