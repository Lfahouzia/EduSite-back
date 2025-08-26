import { CourseRepository } from "./course.repository";
import { CreateCourseDTO, UpdateCourseDTO } from "./course.model";

export class CourseService {
  private courseRepository: CourseRepository;

  constructor() {
    this.courseRepository = new CourseRepository();
  }

  async createCourse(data: CreateCourseDTO) {
    return this.courseRepository.create(data);
  }

  async listCourses(
    page: number,
    limit: number,
    sort: string,
    order: "asc" | "desc",
    filters: { status?: string; tutor_name?: string; title?: string }
  ) {
    return this.courseRepository.findAll(page, limit, sort, order, filters);
  }

  async getCourseById(id: string) {
    return this.courseRepository.findById(id);
  }

  async updateCourse(id: string, data: UpdateCourseDTO) {
    return this.courseRepository.update(id, data);
  }

  async publishCourse(id: string) {
    return this.courseRepository.publishCousrse(id);
  }

  async archiveCourse(id: string) {
    return this.courseRepository.archiveCourse(id);
  }

  //   async deleteCourse(id: string) {
  //     return this.courseRepository.delete(id);
  //   }
}
