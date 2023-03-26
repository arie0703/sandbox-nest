import { Test, TestingModule } from '@nestjs/testing';
import { SqsQueueService } from './sqs-queue.service';

describe('SqsQueueService', () => {
  let service: SqsQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqsQueueService],
    }).compile();

    service = module.get<SqsQueueService>(SqsQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
