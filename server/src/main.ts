import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configDoc = new DocumentBuilder()
    .setTitle('API Tu salud')
    .setDescription(
      'Sistema de gestión de citas.',
    )
    .setVersion('2.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configDoc);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      url: '/api-json',
    },
    customCssUrl: ['https://unpkg.com/swagger-ui-dist@5.10.3/swagger-ui.css'],
    customJs: [
      'https://unpkg.com/swagger-ui-dist@5.10.3/swagger-ui-bundle.js',
      'https://unpkg.com/swagger-ui-dist@5.10.3/swagger-ui-standalone-preset.js',
    ],
  };

  SwaggerModule.setup('api/docs', app, document, customOptions);

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173',
    //credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
