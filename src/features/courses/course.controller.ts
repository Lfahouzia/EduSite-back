import { Request, Response } from "express";
import { CourseService } from "./course.service";
import { HTTP_STATUS } from "../../shared/config/httpStatus";

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  async create(req: Request, res: Response) {
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
    res.json(courses);
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

//   async delete(req: Request, res: Response) {
//     const { id } = req.params;
//     const deleted = await this.courseService.deleteCourse(id);
//     return deleted
//       ? res.json({ message: "Course deleted successfully" })
//       : res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Course not found" });
//   }
}
