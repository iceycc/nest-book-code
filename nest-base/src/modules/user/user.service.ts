import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

  async getPromiseList(): Promise<any[]> {
    return [
      {
        id: 0,
        promise: '菜单一权限'
      }
    ]
  }
}
