import { HttpStatus } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsModule } from './products.module';
import { ProductsService } from './products.service';

// TODO: DynamoDBのmockをテストで共通化する
jest.mock('@aws-sdk/lib-dynamodb', () => {
  const DynamoDBDocumentClientMocked = {
    from: jest.fn().mockReturnValue({
      send: jest
        .fn()
        // 1. 正常系
        .mockResolvedValue({
          $metadata: {
            // PutCommand成功時は200を返す
            httpStatusCode: HttpStatus.OK,
            requestId: 'dummy',
          },
        }),
    }),
  };

  // DynamoDBで使用するメソッドをmockにして返す
  return {
    DynamoDBDocumentClient: DynamoDBDocumentClientMocked,
    PutCommand: jest.fn(),
  };
});

describe('ProductsController', () => {
  let controller: ProductsController;
  let mockedService: ProductsService;
  let configService: ConfigService;

  const mockedProductsService = {
    provide: ProductsService,
    useFactory: () => ({
      createProduct: jest.fn((productName: string): Promise<object> => {
        return Promise.resolve({
          httpStatus: HttpStatus.CREATED,
          message: 'success',
          body: {
            requestID: 'dummy',
            Item: productName,
          },
        });
      }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // JESTでも環境変数の設定を定義しておく
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        ProductsModule,
      ],
      controllers: [ProductsController],
      providers: [mockedProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    mockedService = module.get<ProductsService>(ProductsService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('環境変数が正常に読み込まれている', () => {
    expect(configService.get<string>('AWS_DYNAMODB_REGION')).toBeDefined();
  });

  describe('createProductメソッドが呼び出された時', () => {
    const productName = 'チョコレートバー';

    it('正常なレスポンスが返却される', async () => {
      const expected = {
        httpStatus: HttpStatus.CREATED,
        message: 'success',
        body: {
          requestID: 'dummy',
          Item: productName,
        },
      };

      await controller.createProduct(productName);
      expect(await mockedService.createProduct(productName)).toEqual(expected);
    });
  });
});
