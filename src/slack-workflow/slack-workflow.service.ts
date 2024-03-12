import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { WorkflowRequest } from 'src/slack-workflow/dto/workflow-request.dto';

@Injectable()
export class SlackWorkflowService {
  webhookURL: string;
  constructor(private readonly configService: ConfigService) {
    this.webhookURL = this.configService.get<string>('SLACK_WORKFLOW_URL');
  }

  async sendToChannel(request: WorkflowRequest): Promise<object> {
    const dataString = JSON.stringify(request);

    return axios
      .post(this.webhookURL, dataString)
      .then((res) => {
        console.log(res.status);
        const response = {
          httpStatus: HttpStatus.OK,
          message: 'success',
          body: res.statusText,
        };
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
