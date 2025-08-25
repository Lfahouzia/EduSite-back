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

  async listCourses() {
    return this.courseRepository.findAll();
  }

  async getCourseById(id: string) {
    return this.courseRepository.findById(id);
  }

  async updateCourse(id: string, data: UpdateCourseDTO) {
    return this.courseRepository.update(id, data);
  }

//   async deleteCourse(id: string) {
//     return this.courseRepository.delete(id);
//   }
}
