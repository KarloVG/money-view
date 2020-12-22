import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { NavTogglerComponent } from '../sidenav/nav-toggler/nav-toggler.component';
import {HeaderComponent} from './header.component';


@NgModule({
  declarations: [HeaderComponent, NavTogglerComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent, NavTogglerComponent]
})
export class HeaderModule {
}
