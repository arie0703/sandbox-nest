import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailRequest } from 'src/dto/email-request.dto';
import * as crypto from 'crypto';

@Injectable()
export class EmailsService {
  documentClient: DynamoDBDocumentClient;
  tableName: string;
  constructor(private readonly configService: ConfigService) {
    const dbClient = new DynamoDBClient({
      region: this.configService.get<string>('AWS_LOCALSTACK_REGION'),
      endpoint: this.configService.get<string>('AWS_LOCALSTACK_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });

    this.documentClient = DynamoDBDocumentClient.from(dbClient);
    this.tableName = 'Emails';
  }

  /**
   * メールアドレスをSHA-512でハッシュ化し、16進数表現で返す
   * @return {string} ハッシュ化されたメールアドレスが返される
   */
  private makeHash(email: string): string {
    const hash = crypto.createHash('sha512');
    hash.update(email);
    const hashedEmail = hash.digest('hex');

    return hashedEmail;
  }

  /**
   * メールアドレスを登録する
   * @return {Promise<object>} 登録したメールアドレスやステータスコード、およびメッセージが含まれる
   */
  async register(request: EmailRequest): Promise<object> {
    const email: string = request.email;
    const hashedEmail = this.makeHash(email);

    const params = {
      TableName: this.tableName,
      Item: {
        Email: hashedEmail,
      },
    };

    try {
      const res = await this.documentClient.send(new PutCommand(params));
      console.log(res);

      const requestID: string = res.$metadata.requestId;

      return {
        httpStatus: HttpStatus.CREATED,
        message: 'success',
        body: {
          requestID: requestID,
          email: email,
          hashedEmail: hashedEmail,
        },
      };
    } catch (err) {
      console.log(err);
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

  /**
   * メールアドレス一覧を取得する
   * @return {Promise<object>} メールアドレス一覧やステータスコード、およびメッセージが含まれる
   */
  async getAll(): Promise<object> {
    const params = {
      TableName: this.tableName,
    };
    try {
      const res = await this.documentClient.send(new ScanCommand(params));

      return {
        httpStatus: HttpStatus.OK,
        message: 'success',
        result: res.Items,
      };
    } catch (err) {
      throw new HttpException(
        {
          httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'failed to get emails.',
          body: err,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
