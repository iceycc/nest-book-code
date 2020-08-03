import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { test1MiddleWares } from './middlewares/test1';
import { AuthGuard } from './guard/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ValidationPipe } from './pipes/validation/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(test1MiddleWares())
  app.useGlobalGuards(new AuthGuard())
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
  Logger.log('服务已经启动:localhost:3000');
}
bootstrap();
