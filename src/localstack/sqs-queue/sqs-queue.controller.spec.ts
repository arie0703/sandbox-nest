import { Test, TestingModule } from '@nestjs/testing';
import { SqsQueueController } from './sqs-queue.controller';

describe('SqsQueueController', () => {
  let controller: SqsQueueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SqsQueueController],
    }).compile();

    controller = module.get<SqsQueueController>(SqsQueueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
