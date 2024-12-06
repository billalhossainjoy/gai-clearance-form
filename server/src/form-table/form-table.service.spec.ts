import { Test, TestingModule } from '@nestjs/testing';
import { FormTableService } from './form-table.service';

describe('FormTableService', () => {
  let service: FormTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormTableService],
    }).compile();

    service = module.get<FormTableService>(FormTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
