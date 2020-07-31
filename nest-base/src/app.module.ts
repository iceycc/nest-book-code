import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'typeorm_mysql',
      synchronize: true, // 同步到数据库
      logging: false,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}'
      ],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor (private connection: Connection) {
  }
}
