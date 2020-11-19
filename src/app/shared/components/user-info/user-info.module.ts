import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {UserInfoComponent} from './user-info.component';


@NgModule({
  declarations: [
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    NgbDropdownModule
  ],
  exports: [
    UserInfoComponent
  ]
})
export class UserInfoModule {
}
