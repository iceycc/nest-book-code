import {
  Injectable,
  CanActivate,
  Logger,
  HttpException,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as url from 'url';


@Injectable()
export class AuthGuard implements CanActivate {
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
        const user = await this.verifyToken(token, process.env.SECRET);
        request.user = user;
        return true;
      } catch (e) {
        Logger.error(e, 'auth');
        throw new HttpException('你没有权限访问,请联系管理员', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('你还没登录,请先登录', HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   * @param {token}: token
   * @param {secret}: secret
   * @return:
   * @Description: 校验用户传递过来的token
   * @Author: 水痕
   * @LastEditors: 水痕
   * @Date: 2019-07-31 12:56:01
   */
  private verifyToken(token: string, secret: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (error, payload) => {
        if (error) {
          console.log('-----------error start--------------');
          console.log(error);
          console.log('-----------error end--------------');
          reject(error);
        } else {
          resolve(payload);
        }
      });
    });
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
  private getUrlQuery(urlPath: string, key?: string): string | { [propsName: string]: any } {
    const query = url.parse(urlPath, true).query
    if (key) {
      return query[key]
    } else {
      return query;
    }
  };
}
