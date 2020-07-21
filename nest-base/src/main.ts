import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 引入包
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置静态文件的目录
  //方式一是直接访问:localhost:4000/1.jpg
  //app.useStaticAssets(join(__dirname, '..', 'public')); 
  //方式二是访问:localhost:4000/static/1.jpg但是在public文件夹下不需要创建static目录
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/'
  });
  // 配置视图文件的目录
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  await app.listen(3000);
  Logger.log('服务器已经启动:localhost:3000');
}
bootstrap();
