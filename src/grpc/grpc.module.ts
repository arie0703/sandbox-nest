import { Module } from '@nestjs/common';
import { GrpcService } from './grpc.service';
import { GrpcController } from './grpc.controller';

@Module({
  providers: [GrpcService],
  controllers: [GrpcController]
})
export class GrpcModule { }
