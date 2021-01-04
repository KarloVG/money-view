import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavSideComponent } from './nav-side/nav-side.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NavSideComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[NavSideComponent]
})
export class SidenavModule { }
