import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.options';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // RESTとgRPCのハイブリッド構成
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  const options = new DocumentBuilder()
    .setTitle('Sandbox API')
    .setDescription('sandbox-nest')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(80);
}
bootstrap();
