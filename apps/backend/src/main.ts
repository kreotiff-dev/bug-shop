/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    credentials: true,
    origin: [process.env['CLIENT_URL']],
  })

  const config = new DocumentBuilder()
    .setTitle('Store API')
    .setDescription('API documentation')
    .setVersion('1.0')
    // .addTag('auth')
    // .addTag('user')
    .addBearerAuth()
    .setBasePath('/api')
    .addServer('/api')
    .build()

    // const options = {
    //   swaggerOptions: {
    //     persistAuthorization: true, // this
    //   }
    // };


  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.use(cookieParser())
  app.setGlobalPrefix('api')
  // const port = process.env.PORT_SERVER || 3001
  await app.listen('server.socket');
  // await app.listen(3000)
  // Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  Logger.log(`🚀 Application is running on: server.socket`)
}

bootstrap()
