/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// Add this to the VERY top of the first file loaded in your app
const apm = require('elastic-apm-node').start({

  // Override the service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _, and space
  serviceName: 'Bug-Shop',

  // Use if APM Server requires a secret token
  secretToken: '',

  // Set the custom APM Server URL (default: http://localhost:8200)
  serverUrl: 'http://localhost:8200',

  // Set the service environment
  environment: 'production'
})


import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: [process.env['CLIENT_URL']],
  });

  const config = new DocumentBuilder()
    .setTitle('Store API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  const port = process.env.PORT_SERVER || 3000;
  await app.listen('server.socket');
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
