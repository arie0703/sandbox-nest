import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Snack, SnackById } from './protos/snack';

@Controller('grpc')
export class GrpcController {
  @GrpcMethod('SnacksService', 'FindOne')
  findOne(data: SnackById): Snack {
    const items = [
      { id: 1, name: 'うまい棒' },
      { id: 2, name: 'チョコレート' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
