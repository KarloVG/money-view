import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderModule} from './header/header.module';
import {SidebarModule} from './sidebar/sidebar.module';
import {FooterModule} from './footer/footer.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SidebarModule,
    HeaderModule,
    FooterModule
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutModule {
}
