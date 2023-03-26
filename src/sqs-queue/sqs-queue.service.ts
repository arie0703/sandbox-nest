import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
@Injectable()
export class SqsQueueService {
  apiName: string;
  constructor(private readonly sqsService: SqsService) {}

  /**
   * 登録/更新SQS, メール送信用SQSにキューを登録する
   * @return {Promise<object} 発番したIDやステータスコード、およびメッセージが含まれる
   */
  async register(): Promise<object> {
    let messageInfo: object = {};

    try {
      messageInfo = await this.sqsService.send('sqs-queue', {
        id: (+new Date()).toString(),
        body: { message: 'hoge', status: 'success' },
      });

      console.log(messageInfo);
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const res = {
      statusCode: HttpStatus.CREATED,
      message: 'queue has been registered.',
      info: messageInfo,
    };
    return res;
  }
}
