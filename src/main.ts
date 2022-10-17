import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transformer-interceptor';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const configService: ConfigService = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  //#start-region  Config swagger
  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('PROJECT_NAME'))
    .setDescription(
      `Api for ${configService.get<string>(
        'NODE_ENV',
      )} - v${configService.get<string>('VERSION')}`,
    )
    .setVersion(process.env.VERSION)
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //#end-region Config swagger

  // Global Interceptor
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const PORT = process.env.PORT || 3300;
  await app.listen(PORT);
  Logger.log(`🚀 Application is running on: http://localhost:${PORT}`);
}
bootstrap();
