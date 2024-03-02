import { Test, TestingModule } from '@nestjs/testing';
import { BackendnestController } from './backendnest.controller';

describe('BackendnestController', () => {
  let controller: BackendnestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackendnestController],
    }).compile();

    controller = module.get<BackendnestController>(BackendnestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
