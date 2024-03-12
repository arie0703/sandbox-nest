import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SqsModule } from '@ssut/nestjs-sqs';
import { NewRelicModule } from 'src/utils/newrelic/newrelic.module';
import { SqsQueueController } from './sqs-queue.controller';
import { SqsQueueService } from './sqs-queue.service';

@Module({
  imports: [
    NewRelicModule,
    SqsModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          consumers: [],
          producers: [
            {
              name: 'sandbox-nest',
              queueUrl: configService.get<string>('SQS_QUEUE_URL'),
              region: configService.get<string>('AWS_LOCALSTACK_REGION'),
            },
          ],
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [SqsQueueController],
  providers: [SqsQueueService],
})
export class SqsQueueModule {}
