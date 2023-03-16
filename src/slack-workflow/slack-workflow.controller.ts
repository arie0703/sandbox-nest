import { Controller, Param, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { SlackWorkflowService } from './slack-workflow.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('slack-workflow')
export class SlackWorkflowController {

  constructor(private readonly slackWorkflowService: SlackWorkflowService) {}

  @ApiResponse({ status: HttpStatus.OK })
  @Post(':content/:description')
  @HttpCode(HttpStatus.CREATED)
  sendToChannel(@Param('content') content: string, @Param('description') description: string): Promise<object> {
    return this.slackWorkflowService.sendToChannel(content, description);
  }
}
