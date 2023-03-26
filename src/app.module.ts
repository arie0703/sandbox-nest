import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env-validator';
import { SlackWorkflowController } from './slack-workflow/slack-workflow.controller';
import { SlackWorkflowService } from './slack-workflow/slack-workflow.service';
import { SqsQueueController } from './sqs-queue/sqs-queue.controller';
import { SqsQueueService } from './sqs-queue/sqs-queue.service';
import { SqsQueueModule } from './sqs-queue/sqs-queue.module';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    SqsQueueModule,
  ],
  controllers: [
    AppController,
    ProductsController,
    SlackWorkflowController,
    SqsQueueController,
  ],
  providers: [
    AppService,
    ProductsService,
    SlackWorkflowService,
    SqsQueueService,
  ],
})
export class AppModule {}
