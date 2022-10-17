import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'jwt',
        name: 'jwt',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwt',
    )
    .setBasePath('api')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/doc', app, document);
}
