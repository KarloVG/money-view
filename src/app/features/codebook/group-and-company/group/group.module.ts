import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupOverviewComponent } from './group-overview/group-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GroupOverviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    GroupOverviewComponent
  ]
})
export class GroupModule { }
