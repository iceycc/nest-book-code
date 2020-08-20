import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ObjectType } from '@app/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {
  // 新增角色
  public addRoleApi$(postData: ObjectType): Observable<any> {
    return this.post('admin/role', postData);
  }

  // 根据id删除角色
  public deleteRoleByIdApi$(id: number): Observable<any> {
    return this.delete(`admin/role/${id}`);
  }

  // 根据角色修改id
  public modifyRoleByIdApi$(id: number, postData: ObjectType): Observable<any> {
    return this.patch(`admin/role/${id}`, postData);
  }

  // 查询全部的角色
  public roleListApi$(queryOption: ObjectType): Observable<any> {
    return this.get('admin/role', queryOption)
  }

  // 给角色分配权限
  public assignAccessApi$(params: ObjectType): Observable<any> {
    return this.post('admin/role_access', params)
  }
}
