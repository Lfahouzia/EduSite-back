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

  async list(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = (req.query.sort as string) || "created_at";
    const order = (req.query.order as "asc" | "desc") || "desc";

    const filters: { status?: string; tutor_name?: string; title?: string } = {};
    if (req.query.status) filters.status = req.query.status as string;
    if (req.query.tutor_name) filters.tutor_name = req.query.tutor_name as string;
    if (req.query.title) filters.title = req.query.title as string;

    try {
      const result = await this.courseService.listCourses(
        page,
        limit,
        sort,
        order,
        filters
      );

      return res.json({
        data: result.data,
        pagination: {
          page,
          limit,
          total: result.total,
          totalPages: Math.ceil(result.total / limit),
        },
        message: "Courses retrieved successfully",
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ error: "Failed to retrieve courses", details: err.message });
    }
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

    if (id === undefined) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ error: "Missing course id" });
    }
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
