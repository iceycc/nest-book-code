import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisUtilsModule } from './modules/redis-utils/redis-utils.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    // 配置加载配置文件
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
      modifyConfigName: name => name.replace('.config', ''),
    }),
    // mysql的连接
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: config.get('database.type'),
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        subscribers: [__dirname + './../subscribers/*.subscriber{.ts,.js}'],
        logging: config.get('database.logging'),
        timezone: '+08:00', // 东八区
      }),
      inject: [ConfigService],
    }),
    RedisUtilsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
