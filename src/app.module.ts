import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './localstack/dynamodb/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env-validator';
import { SqsQueueModule } from './localstack/sqs-queue/sqs-queue.module';
import { EmailsModule } from './localstack/dynamodb/emails/emails.module';
import { NotionViewModule } from './notion-view/notion-view.module';
import { AuthModule } from './google/auth/auth.module';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    SqsQueueModule,
    EmailsModule,
    NotionViewModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
