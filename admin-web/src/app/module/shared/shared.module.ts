import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PipesModule } from '@app/pipes/pipes.module';
import { MyTableComponent } from './components/my-table/my-table.component';

@NgModule({
  declarations: [MyTableComponent],
  imports: [
    PipesModule,
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PipesModule,
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    MyTableComponent,
  ]
})
export class SharedModule { }
