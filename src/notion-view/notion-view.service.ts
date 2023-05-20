import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@notionhq/client';
import { NotionRequest } from 'src/dto/notion-request.dto';
@Injectable()
export class NotionViewService {
  notionSecret: string;
  databaseID: string;
  constructor(private readonly configService: ConfigService) {
    this.notionSecret = this.configService.get<string>('NOTION_SECRET');
    this.databaseID = this.configService.get<string>('NOTION_DATABASE_ID');
  }

  async createView(request: NotionRequest): Promise<object> {
    const notion = new Client({
      auth: this.notionSecret,
    });

    const params = {
      parent: { database_id: this.databaseID },
      properties: {
        title: {
          title: [{ text: { content: request.title } }],
        },
        期限: {
          date: {
            start: request.deadline,
          },
        },
        URL: {
          url: request.url,
        },
      },
    };

    try {
      const res = await notion.pages.create(params);
      return {
        httpStatus: HttpStatus.CREATED,
        message: 'ページを追加しました',
        body: res,
      };
    } catch (err) {
      throw {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'error!',
        body: err,
      };
    }
  }
}
