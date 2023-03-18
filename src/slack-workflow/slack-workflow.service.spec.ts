import { Test, TestingModule } from '@nestjs/testing';
import { SlackWorkflowService } from './slack-workflow.service';

describe('SlackWorkflowService', () => {
  let service: SlackWorkflowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlackWorkflowService],
    }).compile();

    service = module.get<SlackWorkflowService>(SlackWorkflowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
