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
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';
import { memoryStorage } from 'multer';
import { FormTableService } from './form-table.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('clearance')
export class FormTableController {
  constructor(private formService: FormTableService) {}

  @Get('rows')
  @UseGuards(AuthGuard('jwt'))
  async getFormTable() {
    const rows = await this.formService.getSigneturesRow();
    return rows;
  }

  @Get('row/:id')
  @UseGuards(AuthGuard('jwt'))
  async getByIdFormTable(@Param('id') id: string) {
    return await this.formService.findRow(id);
  }

  @Post('add-row')
  @UseGuards(AuthGuard('jwt'))
  async postFormTable(@Body() body: Prisma.FormColumnCreateInput) {
    const column = await this.formService.createColumn(body);
    return column;
  }

  @Put('add-sign/:id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  async postFormSigneture(
    @Param('id') id: string,
    @Body() body: { index: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new HttpException('File not found', HttpStatus.NOT_FOUND);

    if (!file.mimetype.startsWith('image/'))
      throw new HttpException(
        'Invalid file type',
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      );

    const imageBuffer = file.buffer.toString('base64');

    const imageString = `data:${file.mimetype};base64,${imageBuffer}`;

    const sign = await this.formService.addSigneture(
      id,
      `sign${body.index}`,
      imageString,
    );
    return sign;
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteFormcolumn(@Param('id') id: string) {
    const row = await this.formService.deleteColumn(id);
    return row;
  }

  @Put('remove/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteSign(@Param('id') id: string, @Query('index') index: string) {
    const sign = await this.formService.deleteSigneture(id, `sign${index}`);
    return sign;
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateFormRow(
    @Param('id') id: string,
    @Body() data: Prisma.FormColumnUpdateInput,
  ) {
    const row = await this.formService.updateSigneturesRow(id, data);
    return row;
  }

  @Get('client')
  async getClearanceForm(
    @Query('shift') shift: 'FIRST' | 'SECOND',
    @Query('tech') tech: 'CST' | 'PT' | 'GD',
  ) {
    const shifts = ['FIRST', 'SECOND'];
    const techs = ['CST', 'PT', 'GD'];
    if (!shifts.includes(shift)) throw new HttpException('Invalid shift', 400);
    if (!techs.includes(tech)) throw new HttpException('Invalid tech', 400);

    const data = await this.formService.tableData(shift, tech);


    return data.cursor["firstBatch"];
  }
}
