import { NgModule, SkipSelf, Optional } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/zh';

import { AuthGuard } from '../../auth/auth.guard';
import { ServicesModule } from '@app/services/services.module';
import { ViewsModule } from '../../views/views.module';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';

// 配置 angular i18n
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServicesModule,
    ViewsModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    AppRoutingModule,
    SharedModule,
  ],
  providers: [AuthGuard, { provide: NZ_I18N, useValue: zh_CN }],
})
export class CoreModule {
  constructor (@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule 只能被appModule引入');
    }
  }
}
