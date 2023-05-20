import { Injectable } from '@nestjs/common';
import { newrelic } from 'newrelic';
@Injectable()
export class NewRelicService {
  /**
   * SQS監視に必要な情報を生成する
   * @returns {AWS.SQS.MessageBodyAttributeMap} SQSのmessageAttributes
   */
  makeSQSMessageAttributes(): AWS.SQS.MessageBodyAttributeMap {
    const currentHeaders: Record<
      string,
      string | number | string[] | undefined
    > = {};
    const attributes: AWS.SQS.MessageBodyAttributeMap = {};

    try {
      // 現在のアプリ情報を格納する
      newrelic.getTransaction().insertDistributedTraceHeaders(currentHeaders);

      Object.entries(currentHeaders).forEach((header) => {
        if (typeof header[1] === 'string') {
          attributes[header[0]] = {
            StringValue: header[1] || '',
            DataType: 'String',
          };
        }
      });
      console.log(attributes);
    } catch {
      // NewRelicの認証に失敗時などは空のAttributeを返す
      console.log('MessageAttributeの生成に失敗しました');
      return {};
    }

    return attributes;
  }
}
