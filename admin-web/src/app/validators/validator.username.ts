import { FormControl } from '@angular/forms';
import { usernameReg } from '@app/constant';
import { ObjectType } from '@app/types';

// 校验用户名
export const ValidatorsUsername = (control: FormControl): ObjectType | null => {
  if (control.value) {
    let valid = usernameReg.test(control.value);
    return valid ? null : { username: true };
  } else {
    return null;
  }
}
