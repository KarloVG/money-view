import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { AppTogglerComponent } from './app-toggler.component';

@NgModule({
  declarations: [
    AppTogglerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppTogglerComponent
  ]
})
export class AppTogglerModule {
}
