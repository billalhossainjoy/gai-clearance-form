import { Module } from '@nestjs/common';
import { FormTableController } from './form-table.controller';
import { FormTableService } from './form-table.service';

@Module({
  controllers: [FormTableController],
  providers: [FormTableService],
})
export class FormTableModule {}
