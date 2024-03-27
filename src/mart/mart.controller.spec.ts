import { Test, TestingModule } from '@nestjs/testing';
import { MartController } from './mart.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MartService } from './mart.service';
import { CustomerResponse } from './dto/customer.dto';
import { HttpStatus } from '@nestjs/common';
import { MartModule } from './mart.module';

describe('MartController', () => {
  let controller: MartController;
  let configService: ConfigService;
  let mertService: MartService;

  const mockedMartService = {
    provide: MartService,
    useFactory: () => ({
      createProduct: jest.fn((productName: string): Promise<CustomerResponse> => {
        return Promise.resolve({
          status: HttpStatus.CREATED,
          message: 'success',
        });
      }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, MartModule],
      providers: [mockedMartService],
      controllers: [MartController],
    }).compile();

    controller = module.get<MartController>(MartController);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
