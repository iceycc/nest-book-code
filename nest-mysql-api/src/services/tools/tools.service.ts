import { Injectable } from '@nestjs/common';
import NodeAuth from 'node-auth0';

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
}
