import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelOverviewComponent } from './user-panel-overview/user-panel-overview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserPanelOverviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserPanelOverviewComponent
      }
    ])
  ]
})
export class UserPanelModule { }
