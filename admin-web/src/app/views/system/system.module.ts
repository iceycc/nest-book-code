import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { AccessComponent } from './access/access.component';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '@app/module/shared/shared.module';
import { UserModalComponent } from './user/modal/user-modal/user-modal.component';



@NgModule({
  entryComponents: [
    UserModalComponent,
  ],
  declarations: [
    UserComponent,
    RoleComponent,
    AccessComponent,
    UserModalComponent,
  ],
  imports: [
    SystemRoutingModule,
    SharedModule,
  ]
})
export class SystemModule { }
