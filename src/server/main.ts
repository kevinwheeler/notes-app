import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

import { ServerModule } from 'src/server/server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.use(cookieParser());
  app.use('/public', express.static(__dirname + '/../../public'));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
