import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}
  async create(createCourseDto: CreateCourseDto) {
    return await this.courseModel.create(createCourseDto);
  }

  async findAll() {
    return await this.courseModel.find();
  }

  async findOne(id: string) {
    const course = await this.courseModel.findById(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseModel.findByIdAndUpdate(
      id,
      updateCourseDto,
      { new: true },
    );
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async remove(id: string) {
    const course = await this.courseModel.findByIdAndDelete(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return 'course deleted successfully';
  }
}
