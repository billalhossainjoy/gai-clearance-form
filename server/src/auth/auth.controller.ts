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
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwt: JwtService,
  ) {}

  @Post('register')
  @UseGuards(AuthGuard('jwt'))
  async register(@Body() body: Prisma.AuthorCreateInput, @Res() res: Response) {
    try {
      const newAuthor = await this.authService.register(body);
      const token = this.jwt.sign({
        id: newAuthor.id,
        email: newAuthor.email,
      });

      res.cookie('token', token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      return res.status(HttpStatus.CREATED).json({
        ...newAuthor,
        token,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req: Request, @Res() res: Response) {
    try {
      const token = this.jwt.sign({ id: req.user.id, email: req.user.email });
      res.cookie('token', token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.status(HttpStatus.OK).json({ email: req.user.email, token });
    } catch (error) {
      throw new HttpException('Login Failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Req() req: Request, @Res() res: Response) {
    try {
      res.clearCookie('token', {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });
      return res.status(HttpStatus.OK).json({ message: 'Logged out' });
    } catch (error) {
      throw new HttpException('logout Failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('author/:id')
  @UseGuards(AuthGuard('jwt'))
  async author(@Param('id') id: string) {
    try {
      const author = await this.authService.validateById(id);
      return author;
    } catch (error) {
      throw new HttpException('logout Failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('authors')
  @UseGuards(AuthGuard('jwt'))
  async authors(@Req() req: Request) {
    try {
      const userId = req.user.id;
      const authors = await this.authService.authors(userId);
      return authors;
    } catch (error) {
      console.log(error);
      throw new HttpException('logout Failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string) {
    try {
      const author = await this.authService.delete(id);
      return author;
    } catch (error) {
      throw new HttpException('Deletion Failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Put('update-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Req() req: Request,
    @Body() body: { password: string },
  ) {
    try {
      await this.authService.changePassword(req.user.id, body.password);
      return {
        message: 'Password updated successfully',
      };
    } catch (error) {
      throw new HttpException('Deletion Failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  async get(@Req() req: Request) {
    return req.user;
  }
}
