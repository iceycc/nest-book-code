import { Component, OnInit } from '@angular/core';
import { ObjectType } from '@app/types';
import { UserService } from '@app/services/user/user.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { UserModalComponent } from './modal/user-modal/user-modal.component';
import { UserRoleModalComponent } from './modal/user-role-modal/user-role-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  // 表格数据
  tableList: ObjectType[] = [];
  // 总多少条数据
  tableTotal: number = 0;
  loadData: boolean = true;

  constructor (
    private readonly userService: UserService,
    private readonly nzModalService: NzModalService,
    private readonly message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.initUserList(this.searchData());
  }

  // 新增用户
  addUser(): void {
    this.nzModalService.create({
      nzTitle: '添加用户',
      nzContent: UserModalComponent,
      nzOnOk: async (componentInstance) => {
        const result = await componentInstance.handleOk();
        if (result) {
          this.initUserList(this.searchData());
        }
        return result;
      }
    })
  }

  // 编辑行
  editRow(rowData: ObjectType): void {
    this.nzModalService.create({
      nzTitle: '编辑用户',
      nzContent: UserModalComponent,
      nzComponentParams: {
        rowData,
      },
      nzOkText: '确认',
      nzCancelText: '取消',
      nzOnOk: async (componentInstance) => {
        const result = await componentInstance.handleOk();
        if (result) {
          this.initUserList(this.searchData());
        }
        return result;
      }
    })
  }

  // 删除数据
  deleteRow(rowData: ObjectType): void {
    const { id } = rowData;
    this.nzModalService.confirm({
      nzTitle: '删除用户提示?',
      nzContent: `<b style="color: red;">是否要删除: ${rowData.username}该用户</b>`,
      nzOkType: 'danger',
      nzOnOk: () => {
        this.userService.deleteUserByIdApi$(id).subscribe(data => {
          const { code, message } = data;
          if (Object.is(code, 0)) {
            this.initUserList(this.searchData());
            this.message.create('success', message);
          } else {
            this.message.create('error', message);
          }
        })
      },
    });
  }

  // 分配角色
  assignRole(rowData: ObjectType): void {
    this.nzModalService.create({
      nzTitle: '给用户分配角色',
      nzContent: UserRoleModalComponent,
      nzComponentParams: {
        userId: rowData.id,
      },
      nzOnOk: async (componentInstance) => {
        const result = await componentInstance.handleOk();
        if (result) {
          this.initUserList(this.searchData());
        }
        return result;
      }
    })
  }

  // 切换页码的时候
  changePage(params: ObjectType) {
    this.loadData = true;
    this.initUserList(this.searchData(params));
  }

  // 设置搜索的条件
  private searchData(params?: ObjectType) {
    return {
      pageNumber: 1,
      pageSize: 10,
      ...params,
    }
  }

  // 获取用户列表数据
  private initUserList(params?: ObjectType): void {
    this.userService.userListApi$(params).subscribe(response => {
      console.log(response);
      const { code, message, result: { data, total } } = response;
      if (Object.is(code, 0)) {
        this.tableList = data;
        this.tableTotal = total;
      } else {
        console.error('查询用户列表', message);
      }
      this.loadData = false;
    })
  }
}
