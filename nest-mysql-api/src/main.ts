import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

import { AppModule } from './app.module';

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
  await app.listen(PORT);
  Logger.log(`服务已经启动:localhost:${PORT}/${PREFIX}`);
}
bootstrap();
