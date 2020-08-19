import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '@app/services/role/role.service';
import { ObjectType } from '@app/types';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent implements OnInit {
  validateForm: FormGroup

  @Input() rowData: ObjectType = {};

  constructor (
    private readonly roleService: RoleService,
    private message: NzMessageService,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', []]
    })
    if (this.isEdit) {
      this.validateForm.patchValue({
        title: this.rowData.title,
        description: this.rowData.description,
      })
    }
  }

  get isEdit(): boolean {
    if (Object.keys(this.rowData).length) {
      return true;
    } else {
      return false;
    }
  }

  // 成功按钮的回调
  handleOk() {
    this.markAsDirty();
    if (this.validateForm.valid) {
      return this.subData(this.validateForm.value);
    } else {
      return false;
    }
  }

  // 提交数据到服务器端
  private async subData(postData: ObjectType) {
    // 编辑
    if (Object.keys(this.rowData).length) {
      const { id, ..._ } = this.rowData;
      const { code, message } = await this.roleService.modifyRoleByIdApi$(id, postData).toPromise();
      if (Object.is(code, 0)) {
        this.message.create('success', message);
        return true;
      } else {
        this.message.create('error', message);
      }
    } else { // 新增
      const { code, message } = await this.roleService.addRoleApi$(postData).toPromise();
      if (Object.is(code, 0)) {
        this.message.create('success', message);
        return true;
      } else {
        this.message.create('error', message);
      }
    }
  }

  private markAsDirty(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
}
