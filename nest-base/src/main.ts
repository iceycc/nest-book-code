import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
const PORT = process.env.PORT || 8080;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置静态资源
  // 1 配置静态文件的目录  http://localhost:3000/1.js
  // app.useStaticAssets(join(__dirname,'..','public'))
  // 2 添加static
  app.useStaticAssets(join(__dirname, '..', 'public/static'), {
    prefix: '/static/',
  });
  // 配置视图文件目录
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs')
  await app.listen(PORT, () => {
    Logger.log(`服务已经启动,请访问:http://localhost:${PORT}`);
  });
}
bootstrap();
