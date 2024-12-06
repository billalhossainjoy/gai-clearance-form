import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FormTableService {
  constructor(private prisma: PrismaService) {}

  async createColumn(data: Prisma.FormColumnCreateInput) {
    const existingId = await this.prisma.formColumn.findUnique({
      where: {
        labelId: data.labelId,
      },
    });
    if (existingId) {
      throw new HttpException(
        'Serial number already exists',
        HttpStatus.CONFLICT,
      );
    }
    const newColumn = await this.prisma.formColumn.create({
      data,
    });
    return newColumn;
  }

  async deleteColumn(id: string) {
    try {
      const existingRow = await this.prisma.formColumn.findUnique({
        where: { id },
      });
      if (!existingRow) {
        throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
      }

      return await this.prisma.formColumn.delete({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
    }
  }

  async addSigneture(id: string, sign: string, image: string) {
    try {
      const existingRow = await this.prisma.formColumn.findUnique({
        where: { id },
      });
      if (!existingRow) {
        throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
      }
      const newSign = await this.prisma.formColumn.update({
        where: { id },
        data: {
          [sign]: image,
        },
      });
      return newSign;
    } catch (error) {
      throw error;
    }
  }

  async deleteSigneture(id: string, sign: string) {
    try {
      const existingRow = await this.prisma.formColumn.findUnique({
        where: { id },
      });
      if (!existingRow) {
        throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
      }

      return await this.prisma.formColumn.update({
        where: { id },
        data: {
          [sign]: null,
        },
      });
    } catch (error) {
      throw new HttpException('Signeture not found', HttpStatus.NOT_FOUND);
    }
  }

  async getSigneturesRow() {
    const signetures = await this.prisma.formColumn.findMany({
      orderBy: {
        labelId: 'asc',
      },
    });
    return signetures;
  }

  async updateSigneturesRow(id: string, data: Prisma.FormColumnUpdateInput) {
    const existingRow = await this.prisma.formColumn.findUnique({
      where: { id },
    });

    if (!existingRow) {
      throw new HttpException('Column not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.formColumn.update({
      where: { id },
      data,
    });
  }

  async findRow(id: string) {
    const signetures = await this.prisma.formColumn.findUnique({
      where: { id },
    });
    return signetures;
  }

  async tableData(shift: 'FIRST' | 'SECOND', depertment: 'CST' | 'PT' | 'GD') {
    try {
      return await this.prisma.$runCommandRaw({
        aggregate: 'FormColumn',
        pipeline: [
          {
            $sort: {
              labelId: 1,
            },
          },
          {
            $project: {
              serial: 1,
              depertment: 1,
              sign1: {
                $cond: {
                  if: { $in: [depertment, '$depertmentId'] },
                  then: {
                    $cond: {
                      if: { $eq: [shift, 'FIRST'] },
                      then: '$sign1',
                      else: '$sign2',
                    },
                  },
                  else: null,
                },
              },
              sign2: {
                $cond: {
                  if: { $in: [depertment, '$depertmentId'] },
                  then: {
                    $cond: {
                      if: { $eq: [shift, 'FIRST'] },
                      then: '$sign3',
                      else: '$sign4',
                    },
                  },
                  else: null,
                },
              },
              sign3: {
                $cond: {
                  if: { $in: [depertment, '$depertmentId'] },
                  then: {
                    $cond: {
                      if: { $eq: [shift, 'FIRST'] },
                      then: '$sign5',
                      else: '$sign6',
                    },
                  },
                  else: null,
                },
              },
            },
          },
        ],
        cursor: {},
      });
    } catch (error) {
      console.log(error);
    }
  }
}
