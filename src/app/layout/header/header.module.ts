import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NgbDropdownModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {
}
