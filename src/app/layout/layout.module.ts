import {NgModule} from '@angular/core';
import {FooterComponent} from './footer/footer.component';
import {FooterModule} from './footer/footer.module';
import {HeaderComponent} from './header/header.component';
import {HeaderModule} from './header/header.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { SidenavModule } from './sidenav/sidenav.module';
import { NavTogglerComponent } from './sidenav/nav-toggler/nav-toggler.component';
import { NavSideComponent } from './sidenav/nav-side/nav-side.component';

@NgModule({
  declarations: [],
  imports: [
    HeaderModule,
    FooterModule,
    SidenavModule,
    NgxSpinnerModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavTogglerComponent,
    NavSideComponent,
    NgxSpinnerModule
  ]
})
export class LayoutModule {
}
