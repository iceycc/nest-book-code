import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async userList(): Promise<any[]> {
    return [
      {
        id: 0,
        name: '张三'
      },
      {
        id: 1,
        name: '李四'
      }
    ]
  }
}
