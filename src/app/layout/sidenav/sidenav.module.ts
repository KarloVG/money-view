import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTopComponent } from './nav-top/nav-top.component';
import { NavTogglerComponent } from './nav-toggler/nav-toggler.component';
import { NavSideComponent } from './nav-side/nav-side.component';


@NgModule({
  declarations: [NavTopComponent, NavSideComponent],
  imports: [
    CommonModule
  ],
  exports:[NavSideComponent, NavTopComponent]
})
export class SidenavModule { }
