import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { IFleksbitResponse } from '../models/fleksbit-response';
import { INotificationLicenceResponse } from '../models/notification-licence-response';
import { NotificationMessageService } from './notification-message.service';

@Component({
  selector: 'mv-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss']
})
export class NotificationMessageComponent implements OnInit {

  licence!: INotificationLicenceResponse;
  isDisplayed: boolean = true;

  constructor(
    private _notificationMessage: NotificationMessageService
  ) { }

  ngOnInit(): void {
    this.getLicences();
  }

  getLicences(): void {
    this._notificationMessage
      .get()
      .pipe(
        take(1),
        map(
          (
            response: IFleksbitResponse<INotificationLicenceResponse>
          ) => response.response
        )
      )
      .subscribe((res: INotificationLicenceResponse) => {
        this.licence = res;
      })
  }

  showComponent(): void{
    this.isDisplayed = false;
  }
}
