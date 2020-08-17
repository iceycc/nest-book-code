import {
  Injectable,
  CanActivate,
  Logger,
  HttpException,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common';
import * as url from 'url';
import { RedisUtilsService } from 'src/modules/redis-utils/redis-utils.service';
import { jwt } from 'src/utils';
import { ObjectType } from '@src/types';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor (
    private readonly redisUtilsService: RedisUtilsService,
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // token可能是在请求头,请求头,url地址中,不管是在哪里传递过来的都接收处理
    const token =
      context.switchToRpc().getData().headers.token ||
      context.switchToHttp().getRequest().body.token ||
      this.getUrlQuery(request.url, 'token');
    Logger.log(`当前的token: ${token}`, 'AuthGuard');
    if (token) {
      try {
        // 拿到token反解出里面的用户id,然后用用户id去redis里面查询redis里面的的token是否与当前的一致
        const currentUserId = jwt.decodeToken(token);
        if (!currentUserId) {
          throw new HttpException(JSON.stringify({ code: 10042, message: '无效的token' }), HttpStatus.OK);
        }
        console.log(currentUserId, '用户id')
        const redisData = await this.redisUtilsService.get(currentUserId);
        console.log(JSON.stringify(redisData), 'redis数据')
        if (Object.is(token, redisData.token)) {
          // 将当前的信息附加到request变量上,然后可以自己定义装饰器获取当前用户信息
          request.user = redisData.userInfo;
          return true;
        } else {
          throw new HttpException(JSON.stringify({ code: 10042, message: 'token已经失效,请重新登录' }), HttpStatus.OK);
        }
      } catch (e) {
        Logger.error(e, 'auth');
        throw new HttpException(e, e.status);
      }
    } else {
      throw new HttpException(JSON.stringify({ code: 10042, message: '你还没登录,请先登录' }), HttpStatus.OK);
    }
  }

  /**
   * @Author: 水痕
   * @Date: 2020-01-23 12:01:38
   * @LastEditors: 水痕
   * @Description: 根据key从一段url中获取query值
   * @param urlPath {String} url地址
   * @param key {String} 获取单独的一个key
   * @return: 
  */
  private getUrlQuery(urlPath: string, key?: string): string | ObjectType {
    const query = url.parse(urlPath, true).query
    if (key) {
      return query[key]
    } else {
      return query;
    }
  };
}
