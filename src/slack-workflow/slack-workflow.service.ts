import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class SlackWorkflowService {
  webhookURL: string;
  constructor(private readonly configService: ConfigService) {
    this.webhookURL = this.configService.get<string>('SLACK_WORKFLOW_URL');
  }

  async sendToChannel(content: string, description: string): Promise<object> {
    const dataString = JSON.stringify({ 'content': content, 'description': description });

    return axios.post(
      this.webhookURL,
      dataString,
    ).then(res => {
      console.log(res.status);
      const response = {
        httpStatus: HttpStatus.OK,
        message: 'success',
        body: res.statusText,
      }
      return response;
    })
    .catch((err) => {
      console.log(err.res.message);
      throw new HttpException(
        {
          httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'error',
          body: err,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });


    
  }  
}
