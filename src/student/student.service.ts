import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  create(student: Partial<Student>) {
    return this.studentRepository.save(student);
  }

  findAll() {
    return this.studentRepository.find();
  }

  findOne(id: number) {
    return this.studentRepository.findOneBy({ id });
  }

  async update(id: number, updateData: Partial<Student>) {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) throw new NotFoundException('Student not found');
    Object.assign(student, updateData);
    return this.studentRepository.save(student);
  }

  async remove(id: number) {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) throw new NotFoundException('Student not found');
    await this.studentRepository.remove(student);
    return { deleted: true };
  }
}