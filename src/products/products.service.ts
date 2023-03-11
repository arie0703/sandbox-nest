import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductsService {
  documentClient: DynamoDBDocumentClient;
  tableName: string;
  constructor(private readonly configService: ConfigService) {
    const dbClient = new DynamoDBClient({
      region: this.configService.get<string>('AWS_DYNAMODB_REGION'),
      endpoint: this.configService.get<string>('AWS_DYNAMODB_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });

    this.documentClient = DynamoDBDocumentClient.from(dbClient);
    this.tableName = 'Products';
  }

  async createProduct(productName: string): Promise<object> {
    console.log(productName);
    const params = {
      TableName: this.tableName,
      Item: {
        ProductName: productName,
      },
    };

    try {
      const res = await this.documentClient.send(new PutCommand(params));
      console.log(res);
      return {
        httpStatus: HttpStatus.CREATED,
        message: 'success',
        body: res,
      };
    } catch (err) {
      throw new HttpException(
        {
          httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'error',
          body: err,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
