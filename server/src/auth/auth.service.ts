import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(author: Prisma.AuthorCreateInput) {
    try {
      const existingUser = await this.prisma.author.findUnique({
        where: {
          email: author.email,
        },
      });
      if (existingUser) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }

      const hashedPassword = bcrypt.hashSync(author.email, 10);

      return await this.prisma.author.create({
        data: {
          ...author,
          isActive: true,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error during registration: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validate(username: string, password: string) {
    try {
      const user = await this.prisma.author.findUnique({
        where: {
          email: username,
        },
      });
      if (!user)
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
      return user;
    } catch (error) {
      throw new HttpException(
        `Error during login validation: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateById(id: string) {
    try {
      const user = await this.prisma.author.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException(
        `Error fetching user by ID: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async authors(id: string) {
    try {
      return await this.prisma.author.findMany({
        where: {
          id: {
            not: id,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        `Error fetching authors: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    try {
      const existingUser = await this.prisma.author.findUnique({
        where: { id },
      });
      if (!existingUser)
        throw new HttpException('Author not fount', HttpStatus.NOT_FOUND);

      return await this.prisma.author.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Delete author: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async changePassword(id: string, password: string) {
    try {
      const existingUser = await this.prisma.author.findUnique({
        where: { id },
      });
      if (!existingUser)
        throw new HttpException('Author not fount', HttpStatus.NOT_FOUND);

      const hashedPassword = bcrypt.hashSync(password, 10);
      return await this.prisma.author.update({
        where: { id },
        data: { password: hashedPassword },
      });
    } catch (error) {
      throw new HttpException(
        `Delete author: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
