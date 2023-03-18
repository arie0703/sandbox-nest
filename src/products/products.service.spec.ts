import { HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsModule } from './products.module';
import { ProductsService } from './products.service';

jest.mock('@aws-sdk/client-dynamodb', () => {
  return {
    DynamoDBClient: jest.fn(),
  };
});

jest.mock('@aws-sdk/lib-dynamodb', () => {
  const DynamoDBDocumentClientMocked = {
    from: jest.fn().mockReturnValue({
      send: jest
        .fn()
        // 1. 正常系
        .mockResolvedValueOnce({
          $metadata: {
            // PutCommand成功時は200を返す
            httpStatusCode: HttpStatus.OK,
            requestId: 'dummy',
          },
        })
        // 2. 異常系
        .mockResolvedValueOnce({}),
    }),
  };

  // DynamoDBで使用するメソッドをmockにして返す
  return {
    DynamoDBDocumentClient: DynamoDBDocumentClientMocked,
    PutCommand: jest.fn(),
  };
});

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ProductsService],
    }).compile();
    service = module.get<ProductsService>(ProductsService);
  });

  describe('正常系テスト', () => {
    it('文字列をcreateProductメソッドへ渡したとき', async () => {
      const productName = 'チョコレートバー';

      const expected = {
        httpStatus: HttpStatus.CREATED,
        message: 'success',
        body: {
          requestID: 'dummy',
          Item: productName,
        },
      };

      expect(await service.createProduct(productName)).toEqual(expected);
    });
  });

  describe('異常系テスト', () => {
    it('文字列をcreateProductメソッドへ渡したとき', async () => {
      const productName = 'チョコレートバー';
      await expect(service.createProduct(productName)).rejects.toThrow();
    });
  });
});
