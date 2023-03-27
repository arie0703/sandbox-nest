import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SqsQueueController } from './sqs-queue.controller';
import { SqsQueueService } from './sqs-queue.service';

@Module({
  imports: [
    SqsModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          consumers: [],
          producers: [
            {
              name: 'sqs-queue',
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
