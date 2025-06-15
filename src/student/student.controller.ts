import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() student: Partial<Student>) {
    return this.studentService.create(student);
  }

  @Get()
  async findAll(@Query('registrationNumber') registrationNumber?: string) {
    if (registrationNumber) {
      return this.studentService.findByRegistrationNumber(registrationNumber);
    }
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.studentService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() student: Partial<Student>) {
    return this.studentService.update(Number(id), student);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.studentService.remove(Number(id));
  }
}