import { Module } from '@nestjs/common';
import { MartController } from './mart.controller';
import { MartService } from './mart.service';

@Module({
  controllers: [MartController],
  providers: [MartService],
})
export class MartModule { }
