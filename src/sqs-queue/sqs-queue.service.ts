import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SqsService } from '@ssut/nestjs-sqs';
import { NewRelicService } from 'src/utils/newrelic/newrelic.service';
@Injectable()
export class SqsQueueService {
  apiName: string;
  constructor(private readonly sqsService: SqsService, private readonly newrelicService: NewRelicService,private readonly configService: ConfigService) {}

  /**
   * SQSにキューを登録する
   * @return {Promise<object} ステータスコード、メッセージが含まれる
   */
  async register(): Promise<object> {
    let messageInfo: object = {};

    try {
      messageInfo = await this.sqsService.send('sqs-queue', {
        id: (+new Date()).toString(),
        body: { message: 'hoge', status: 'success' },
        messageAttributes: this.newrelicService.makeSQSMessageAttributes(),
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
