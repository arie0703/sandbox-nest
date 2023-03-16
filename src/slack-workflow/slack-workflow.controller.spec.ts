import { Test, TestingModule } from '@nestjs/testing';
import { SlackWorkflowController } from './slack-workflow.controller';

describe('SlackWorkflowController', () => {
  let controller: SlackWorkflowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlackWorkflowController],
    }).compile();

    controller = module.get<SlackWorkflowController>(SlackWorkflowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
