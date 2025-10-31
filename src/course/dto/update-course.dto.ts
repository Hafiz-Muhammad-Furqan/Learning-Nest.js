import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  courseName: string;

  description: string;

  level: string;

  price: number;
}
