import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HttpErrorFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Product Service')
    .setDescription('Product API')
    .setVersion('1.0.0')
    .addServer('/')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalFilters(new HttpErrorFilter());
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'product.v1',
      protoPath: join(__dirname, './proto/product.proto'),
      url: process.env.GRPC_ADDR || '0.0.0.0:50051',
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3001);
}
void bootstrap();
