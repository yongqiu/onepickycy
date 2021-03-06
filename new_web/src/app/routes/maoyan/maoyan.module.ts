import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaoyanComponent } from './maoyan.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgxEchartsModule } from 'ngx-echarts';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    NgxEchartsModule,
    RouterModule.forChild([{ path: '', component: MaoyanComponent }]),
  ],
  declarations: [MaoyanComponent]
})
export class MaoyanModule { }
