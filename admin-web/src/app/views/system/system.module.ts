import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { AccessComponent } from './access/access.component';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '@app/module/shared/shared.module';
import { UserModalComponent } from './user/modal/user-modal/user-modal.component';
import { UserRoleModalComponent } from './user/modal/user-role-modal/user-role-modal.component';
import { RoleModalComponent } from './role/modal/role-modal/role-modal.component';

@NgModule({
  entryComponents: [
    UserModalComponent,
    UserRoleModalComponent,
    RoleModalComponent,
  ],
  declarations: [
    UserComponent,
    RoleComponent,
    AccessComponent,
    UserModalComponent,
    UserRoleModalComponent,
    RoleModalComponent,
  ],
  imports: [
    SystemRoutingModule,
    SharedModule,
  ]
})
export class SystemModule { }
