import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'Snack',
    protoPath: join(__dirname, '../grpc/protos/snack/snack.proto'),
  },
};