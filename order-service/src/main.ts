import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpErrorFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Order Service')
    .setDescription('Order API')
    .setVersion('1.0.0')
    .addServer('/')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalFilters(new HttpErrorFilter());
  await app.listen(process.env.PORT ?? 3002);
}
void bootstrap();
