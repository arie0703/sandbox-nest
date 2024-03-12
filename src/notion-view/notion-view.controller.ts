import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { NotionRequest } from 'src/notion-view/dto/notion-request.dto';
import { NotionViewService } from './notion-view.service';

@Controller('notion-view')
export class NotionViewController {
  constructor(private readonly notionViewService: NotionViewService) {}
  @ApiResponse({ status: HttpStatus.CREATED })
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  createView(@Body() request: NotionRequest): Promise<object> {
    return this.notionViewService.createView(request);
  }
}
