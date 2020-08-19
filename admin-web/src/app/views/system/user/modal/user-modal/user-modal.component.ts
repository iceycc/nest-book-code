import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '@app/services/user/user.service';
import { ObjectType } from '@app/types';
import { ValidatorsUsername } from '@app/validators';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  validateForm: FormGroup;

  // 输入属性
  @Input() rowData: ObjectType = {};

  constructor (
    private readonly fb: FormBuilder,
    private readonly message: NzMessageService,
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required, ValidatorsUsername]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
    // 如果是编辑的时候就删除字段并且赋值
    if (this.isEdit) {
      this.validateForm.removeControl('password');
      this.validateForm.patchValue({
        username: this.rowData.username,
      })
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

  get isEdit(): boolean {
    if (Object.keys(this.rowData).length) {
      return true;
    } else {
      return false;
    }
  }

  // 提交数据到服务器端
  private async subData(postData: ObjectType): Promise<boolean | null> {
    if (this.isEdit) {
      const { id, ..._ } = this.rowData;
      const { code, message } = await this.userService.modifyUserByIdApi$(id, postData).toPromise();
      if (Object.is(code, 0)) {
        this.message.create('success', message);
        return true;
      } else {
        this.message.create('error', message);
      }
    } else {
      const { code, message } = await this.userService.createUserApi$(postData).toPromise();
      if (Object.is(code, 0)) {
        this.message.create('success', message);
        return true;
      } else {
        this.message.create('error', message);
      }
    }
  }

  // 数据校验提示错误信息
  private markAsDirty(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
}
