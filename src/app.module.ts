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

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
  ],
  controllers: [AppController, ProductsController, SlackWorkflowController],
  providers: [AppService, ProductsService, SlackWorkflowService],
})
export class AppModule {}
