import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env-validator';
import { SqsQueueModule } from './sqs-queue/sqs-queue.module';
import { EmailsModule } from './emails/emails.module';
import { NotionViewModule } from './notion-view/notion-view.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
