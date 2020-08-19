import { Component, OnInit } from '@angular/core';
import { ObjectType } from '@app/types';
import { UserService } from '@app/services/user/user.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { UserModalComponent } from './modal/user-modal/user-modal.component';

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

  // 当前页码
  pageNum: number = 1;
  // 默认一页显示多少条
  pageSize: number = 10;
  // 页码可以选择一次展示多少条数据
  nzPageSizeOptions: number[] = [10, 20, 30, 40, 50];
  // 设置表格滚动条
  tableScroll: ObjectType = { x: '500px' };

  constructor (
    private readonly userService: UserService,
    private readonly nzModalService: NzModalService,
    private readonly message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.initUserList();
  }

  // 新增用户
  addUser(): void {
    this.nzModalService.create({
      nzTitle: '添加用户',
      nzContent: UserModalComponent,
      nzOnOk: async (componentInstance) => {
        const result = await componentInstance.handleOk();
        if (result) {
          this.initUserList();
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
          this.initUserList();
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
            this.initUserList();
            this.message.create('success', message);
          } else {
            this.message.create('error', message);
          }
        })
      },
    });
  }

  // 页码改变触发事件
  changePageNumber(pageNum: number): void {
    this.pageNum = pageNum;
  }

  // 页数改变触发事件
  changePageSize(pageSize: number): void {
    this.pageSize = pageSize;
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
