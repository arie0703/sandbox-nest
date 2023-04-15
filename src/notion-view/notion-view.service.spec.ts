import { Test, TestingModule } from '@nestjs/testing';
import { NotionViewService } from './notion-view.service';

describe('NotionViewService', () => {
  let service: NotionViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotionViewService],
    }).compile();

    service = module.get<NotionViewService>(NotionViewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
