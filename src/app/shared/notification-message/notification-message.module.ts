import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationMessageComponent } from './notification-message.component';



@NgModule({
  declarations: [NotificationMessageComponent],
  imports: [
    CommonModule
  ],
  exports:[NotificationMessageComponent]
})
export class NotificationModule { }
