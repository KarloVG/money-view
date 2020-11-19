import {NgModule} from '@angular/core';
import {FooterComponent} from './footer/footer.component';
import {FooterModule} from './footer/footer.module';
import {HeaderComponent} from './header/header.component';
import {HeaderModule} from './header/header.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SidebarModule} from './sidebar/sidebar.module';


@NgModule({
  declarations: [],
  imports: [
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
