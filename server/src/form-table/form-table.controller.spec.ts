import { Test, TestingModule } from '@nestjs/testing';
import { FormTableController } from './form-table.controller';

describe('FormTableController', () => {
  let controller: FormTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormTableController],
    }).compile();

    controller = module.get<FormTableController>(FormTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
