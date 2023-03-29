import { Controller, HttpCode, HttpStatus, Post, Body, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { EmailRequest } from 'src/dto/email-request.dto';
import { EmailsService } from './emails.service';

@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @ApiResponse({ status: HttpStatus.CREATED })
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() request: EmailRequest): Promise<object> {
    return this.emailsService.register(request);
  }

  @ApiResponse({ status: HttpStatus.OK })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<object> {
    return this.emailsService.getAll();
  }
}
