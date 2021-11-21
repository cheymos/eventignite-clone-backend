import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { MainValidationPipe } from './common/pipes/main-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new MainValidationPipe());
  await app.listen(3000);
}
bootstrap();
