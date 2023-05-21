import { Injectable } from '@nestjs/common';

@Injectable()
export class NewRelicService {
  newrelic: any;

  // importではなくrequireで呼び出さないと動かない
  // クラス呼び出し時にconstructorで呼び出さないと、LICENSE_KEY等の環境変数より先にrequireが呼び出され、認証が通らなくなる。
  constructor() {
    this.newrelic = require('newrelic');
  } 

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
    // importではなくrequireで定義しないと動かない。

    try {
      // 現在のアプリ情報を格納する
      this.newrelic.getTransaction().insertDistributedTraceHeaders(currentHeaders);
      
      Object.entries(currentHeaders).forEach((header) => {
        if (typeof header[1] === 'string') {
          attributes[header[0]] = {
            StringValue: header[1] || '',
            DataType: 'String',
          };
        }
      });
      console.log(attributes);
    } catch (err) {
      // SQS監視用のAttributesが取得できない場合はエラー出力して、空のままオブジェクトを返す
      console.log('MessageAttributeの生成に失敗しました');
      console.log(err);
    }

    return attributes;
  }
}
