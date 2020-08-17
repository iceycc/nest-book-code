import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import NodeAuth from 'node-auth0';
import { isInt } from 'class-validator';

@Injectable()
export class ToolsService {
  private nodeAuth: NodeAuth;

  constructor () {
    this.nodeAuth = new NodeAuth();
  }

  /**
   * @Author: 水痕
   * @Date: 2020-08-14 11:57:11
   * @LastEditors: 水痕
   * @Description: 校验密码
   * @param {type} 
   * @return {type} 
   */
  checkPassword(password: string, sqlPassword: string): boolean {
    return this.nodeAuth.checkPassword(password, sqlPassword);
  }

  /**
   * @Author: 水痕
   * @Date: 2020-08-17 07:53:47
   * @LastEditors: 水痕
   * @Description: 对密码加密处理
   * @param {type} 
   * @return {type} 
   */
  makePassword(password: string): string {
    return this.nodeAuth.makePassword(password);
  }

  /**
   * @Author: 水痕
   * @Date: 2020-08-17 08:09:55
   * @LastEditors: 水痕
   * @Description: 校验传递过来的页码
   * @param {type} 
   * @return {type} 
   */
  public checkPage(pageSize: number, pageNumber: number): void {
    if (!isInt(Number(pageSize)) || !isInt(Number(pageNumber))) {
      throw new HttpException(`传递的pageSize:${pageSize},pageNumber:${pageNumber}其中一个不是整数`, HttpStatus.OK);
    }
  }
}
