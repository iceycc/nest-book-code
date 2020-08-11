import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from './pipes/validation/validation.pipe';

const PORT = process.env.PORT || 8080;
const PREFIX = process.env.PREFIX || '/';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 允许跨域请求
  app.enableCors();
  // 翻译为⛑
  app.use(helmet());
  // 访问频率限制(15分钟内最多访问100次)
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  // 给请求添加prefix
  app.setGlobalPrefix(PREFIX);
  // 配置全局拦截器、过滤器、管道
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  // 配置api文档信息
  const options = new DocumentBuilder()
    .setTitle('nest framework  api文档')
    .setDescription('nest framework  api接口文档')
    .setBasePath(PREFIX) // 设置基础的路径
    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'token' }) // 设置请求头的token字段
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${PREFIX}/docs`, app, document);

  await app.listen(PORT);
  Logger.log(`服务已经启动:localhost:${PORT}/${PREFIX}`);
}
bootstrap();
