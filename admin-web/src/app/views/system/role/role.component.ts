import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ObjectType } from '@app/types';
import { RoleService } from '@app/services/role/role.service';
import { RoleModalComponent } from './modal/role-modal/role-modal.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
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
    private roleService: RoleService,
    private message: NzMessageService,
    private readonly nzModalService: NzModalService,
  ) { }

  ngOnInit(): void {
    this.initRoleList(this.searchData());
  }

  // 新增角色
  addRole(): void {
    this.nzModalService.create({
      nzTitle: '添加角色',
      nzContent: RoleModalComponent,
      nzOnOk: async (componentInstance) => {
        const result = await componentInstance.handleOk();
        if (result) {
          this.initRoleList(this.searchData());
        }
        return result;
      }
    })
  }

  // 编辑角色
  editRole(rowData: ObjectType): void {
    this.nzModalService.create({
      nzTitle: '修改角色',
      nzContent: RoleModalComponent,
      nzComponentParams: {
        rowData
      },
      nzOnOk: async (componentInstance) => {
        const result = await componentInstance.handleOk();
        if (result) {
          this.initRoleList(this.searchData());
        }
        return result;
      }
    })
  }
  menusAuth(rowData: ObjectType, type: number): void { }
  interfaceAuth(rowData: ObjectType, type: number): void { }
  // 删除角色
  deleteRow(rowData: ObjectType): void {
    const { id } = rowData;
    this.nzModalService.confirm({
      nzTitle: '删除角色提示?',
      nzContent: `<b style="color: red;">是否要删除: ${rowData.title}该角色</b>`,
      nzOkType: 'danger',
      nzOnOk: () => {
        this.roleService.deleteRoleByIdApi$(id).subscribe(data => {
          const { code, message } = data;
          if (Object.is(code, 0)) {
            this.initRoleList(this.searchData());
            this.message.create('success', message);
          } else {
            this.message.create('error', message);
          }
        })
      },
    });
  }


  // 切换页码的时候
  changePage(params: ObjectType) {
    this.loadData = true;
    this.initRoleList(this.searchData(params));
  }

  // 设置搜索的条件
  private searchData(params?: ObjectType) {
    return {
      pageNumber: 1,
      pageSize: 10,
      ...params,
    }
  }

  private initRoleList(queryOption?: ObjectType): void {
    this.roleService.roleListApi$(queryOption).subscribe(response => {
      const { code, message, result: { data, total } } = response;
      if (Object.is(code, 0)) {
        this.tableList = data;
        this.tableTotal = total;
      } else {
        console.error('获取角色失败', message);
      }
      this.loadData = false;
    })
  }
}
