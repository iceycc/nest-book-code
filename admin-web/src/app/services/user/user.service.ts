import { Injectable } from '@angular/core';
import { ObjectType } from '@app/types';
import { BaseService } from '../base/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  // 用户修改密码
  public modifyPassword$(postData: ObjectType): Observable<any> {
    return this.post('admin/users/modify_password', postData);
  }

  // 新增用户
  public createUserApi$(postData: ObjectType): Observable<any> {
    return this.post('admin/users', postData);
  }

  // 删除用户
  public deleteUserByIdApi$(id: number): Observable<any> {
    return this.delete(`admin/users/${id}`);
  }

  // 修改用户
  public modifyUserByIdApi$(id: number, postData: ObjectType): Observable<any> {
    return this.patch(`admin/users/${id}`, postData);
  }

  // 获取用户列表
  public userListApi$(params?: ObjectType): Observable<any> {
    return this.get('admin/users', params);
  }

}
