import { Controller, Post, HttpStatus, HttpCode, Body } from '@nestjs/common';
import { SlackWorkflowService } from './slack-workflow.service';
import { ApiResponse } from '@nestjs/swagger';
import { WorkflowRequest } from './dto/workflow-request.dto';

@Controller('slack-workflow')
export class SlackWorkflowController {
  constructor(private readonly slackWorkflowService: SlackWorkflowService) {}

  @ApiResponse({ status: HttpStatus.OK })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  sendToChannel(@Body() request: WorkflowRequest): Promise<object> {
    return this.slackWorkflowService.sendToChannel(request);
  }
}
