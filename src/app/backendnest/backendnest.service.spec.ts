import { Test, TestingModule } from '@nestjs/testing';
import { BackendnestService } from './backendnest.service';

describe('BackendnestService', () => {
  let service: BackendnestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackendnestService],
    }).compile();

    service = module.get<BackendnestService>(BackendnestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
