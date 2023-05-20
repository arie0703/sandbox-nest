import { Test, TestingModule } from '@nestjs/testing';
import { NewRelicService } from './newrelic.service';

describe('NewRelicService', () => {
  let service: NewRelicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewRelicService],
    }).compile();

    service = module.get<NewRelicService>(NewRelicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
