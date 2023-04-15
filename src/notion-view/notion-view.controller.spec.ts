import { Test, TestingModule } from '@nestjs/testing';
import { NotionViewController } from './notion-view.controller';

describe('NotionViewController', () => {
  let controller: NotionViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotionViewController],
    }).compile();

    controller = module.get<NotionViewController>(NotionViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
