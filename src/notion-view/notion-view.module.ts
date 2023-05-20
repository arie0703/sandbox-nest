import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotionViewController } from './notion-view.controller';
import { NotionViewService } from './notion-view.service';

@Module({
  imports: [ConfigModule],
  controllers: [NotionViewController],
  providers: [NotionViewService],
})
export class NotionViewModule {}
