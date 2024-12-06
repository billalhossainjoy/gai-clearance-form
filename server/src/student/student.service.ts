import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async createStudent(student: Prisma.StudentCreateInput) {
    try {
      const existingStudent = await this.prisma.student.findMany({
        where: {
          OR: [
            {
              roll: student.roll,
            },
            {
              registrationNo: student.registrationNo,
            },
          ],
        },
      });

      if (existingStudent.length > 0)
        throw new HttpException(
          'Roll or registration are already in use. ',
          HttpStatus.CONFLICT,
        );

      const newStudent = await this.prisma.student.create({
        data: {
          ...student,
          accepted: true,
        },
      });

      if (!newStudent)
        return new HttpException(
          'Student not found.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      return newStudent;
    } catch (error) {
      throw new HttpException(
        `Error creating student: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async applicationStudent(student: Prisma.StudentCreateInput) {
    try {
      const existingStudent = await this.prisma.student.findMany({
        where: {
          OR: [
            {
              roll: student.roll,
            },
            {
              registrationNo: student.registrationNo,
            },
          ],
        },
      });

      if (existingStudent.length > 0)
        throw new HttpException(
          'Roll or registration are already in use. ',
          HttpStatus.CONFLICT,
        );

      const newStudent = await this.prisma.student.create({
        data: {
          ...student,
          active: true,
        },
      });

      if (!newStudent)
        return new HttpException(
          'Server error.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      return newStudent;
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(id: string, student: Prisma.StudentUpdateInput) {
    try {
      const existingStudent = await this.prisma.student.findUnique({
        where: { id },
      });

      if (!existingStudent)
        throw new HttpException('Student not found.', HttpStatus.NOT_FOUND);

      const updatedStudent = await this.prisma.student.update({
        where: { id },
        data: student,
      });

      return updatedStudent;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Error updating student: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteStudent(id: string) {
    try {
      const existingStudent = await this.prisma.student.findUnique({
        where: { id },
      });

      if (!existingStudent)
        throw new HttpException('Student not found.', HttpStatus.NOT_FOUND);

      return await this.prisma.student.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error deleting student: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async acceptStudent(id: string) {
    try {
      const existingStudent = await this.prisma.student.findUnique({
        where: { id },
      });

      if (!existingStudent)
        throw new HttpException('Student not found.', HttpStatus.NOT_FOUND);

      return await this.prisma.student.update({
        data: {
          accepted: true,
        },
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error deleting student: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async student(id: string) {
    try {
      const existingStudent = await this.prisma.student.findUnique({
        where: { id },
      });

      if (!existingStudent)
        throw new HttpException('Student not found.', HttpStatus.NOT_FOUND);

      return await this.prisma.student.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error fetching student: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async studentByRoll(roll: number) {
    try {
      const existingStudent = await this.prisma.student.findUnique({
        where: { roll },
      });

      if (!existingStudent)
        throw new HttpException('Student not found. ', HttpStatus.NOT_FOUND);

      if (!existingStudent.active)
        throw new HttpException(
          'This roll number is blocked: ' + existingStudent.blockReason,
          HttpStatus.FORBIDDEN,
        );

      if (!existingStudent.accepted)
        throw new HttpException(
          'Not accepted at the moment',
          HttpStatus.NOT_ACCEPTABLE,
        );

      return existingStudent;
    } catch (error) {
      throw error;
    }
  }

  async students() {
    try {
      return await this.prisma.student.findMany({
        where: {
          active: true,
          accepted: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error fetching students: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async blockedStudents() {
    try {
      return await this.prisma.student.findMany({
        where: {
          active: false,
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error fetching students: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async applicantStudents() {
    try {
      return await this.prisma.student.findMany({
        where: {
          accepted: false,
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error fetching students: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
