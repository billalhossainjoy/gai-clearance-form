import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  addStudent(@Body() data: Prisma.StudentCreateInput) {
    try {
      const student = this.studentService.createStudent(data);
      return student;
    } catch (error) {
      throw new HttpException(
        'add student failed',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'))
  updateStudent(
    @Param('id') id: string,
    @Body() data: Prisma.StudentUpdateInput,
  ) {
    try {
      const student = this.studentService.updateStudent(id, data);
      return student;
    } catch (error) {
      throw new HttpException('update failed.', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Delete('remove/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteStudent(@Param('id') id: string) {
    try {
      return this.studentService.deleteStudent(id);
    } catch (error) {
      throw new HttpException('delete Failed.', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Put('accept/:id')
  @UseGuards(AuthGuard('jwt'))
  acceptStudent(@Param('id') id: string) {
    try {
      return this.studentService.acceptStudent(id);
    } catch (error) {
      throw new HttpException('delete Failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('all-active-students')
  @UseGuards(AuthGuard('jwt'))
  async getActiveStudents() {
    try {
      return await this.studentService.students();
    } catch (error) {
      throw new HttpException('fetch failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('all-blocked-students')
  @UseGuards(AuthGuard('jwt'))
  async getBlockedStudents() {
    try {
      return await this.studentService.blockedStudents();
    } catch (error) {
      throw new HttpException('fetch failed', HttpStatus.EXPECTATION_FAILED);
    }
  }
  @Get('all-applicant-students')
  @UseGuards(AuthGuard('jwt'))
  async getAllApplicants() {
    try {
      return await this.studentService.applicantStudents();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getStudent(@Param('id') id: string) {
    try {
      return await this.studentService.student(id);
    } catch (error) {
      throw new HttpException('fetch failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('get/:roll')
  async getStudentByRoll(@Param('roll') roll: string) {
    try {
      const rollNumber = parseInt(roll, 10);
      const student = await this.studentService.studentByRoll(rollNumber);

      return student;
    } catch (error) {
      throw error;
    }
  }

  @Post('apply')
  applicationStudent(@Body() data: Prisma.StudentCreateInput) {
    try {
      const student = this.studentService.applicationStudent(data);
      return student;
    } catch (error) {
      console.log(error);
      throw new HttpException('apply failed', HttpStatus.EXPECTATION_FAILED);
    }
  }
}
