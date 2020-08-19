import { Component, OnInit } from '@angular/core';
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
  // 是否编辑状态
  isEdit: boolean = false;

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
  private async subData(postData: ObjectType): Promise<boolean | null> {
    const { code, message } = await this.userService.createUserApi$(postData).toPromise();
    if (Object.is(code, 0)) {
      this.message.create('success', message);
      return true;
    } else {
      this.message.create('error', message);
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
