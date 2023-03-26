import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SqsQueueService } from './sqs-queue.service';

@Controller('sqs-queue')
export class SqsQueueController {
  constructor(private readonly sqsQueueService: SqsQueueService) {}

  @ApiResponse({ status: HttpStatus.OK })
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  register(): Promise<object> {
    return this.sqsQueueService.register();
  }
}
