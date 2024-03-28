import { Module } from '@nestjs/common';
import { MartController } from './mart.controller';
import { MartService } from './mart.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [MartController],
  providers: [MartService],
})
export class MartModule { }
