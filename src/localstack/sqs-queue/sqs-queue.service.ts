import { HttpException, HttpStatus } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';

export class SqsQueueService {
  apiName: string;
  constructor(
    private readonly sqsService: SqsService,
  ) { }

  /**
   * SQSにキューを登録する
   * @return {Promise<object} ステータスコード、メッセージが含まれる
   */
  async register(): Promise<object> {
    let messageInfo: object = {};

    try {
      messageInfo = await this.sqsService.send('sandbox-nest', {
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
