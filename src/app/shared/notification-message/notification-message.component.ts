import { AfterViewInit, Component, OnInit } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { IFleksbitResponse } from '../models/fleksbit-response';
import { INotificationLicenceResponse } from '../models/notification-licence-response';
import { NotificationMessageService } from './notification-message.service';

@Component({
  selector: 'mv-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss']
})
export class NotificationMessageComponent implements OnInit, AfterViewInit {

  licence!: INotificationLicenceResponse;
  viewComponent: any = true;

  constructor(
    private _notificationMessage: NotificationMessageService
  ) { }

  ngOnInit(): void {
    this.getLicences();
  }

  ngAfterViewInit(): void{
    const token = sessionStorage.getItem('view-notification');
    if(token){
      this.viewComponent = JSON.parse(token);
    }
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
    this.viewComponent = false;
    sessionStorage.setItem('view-notification', JSON.stringify(this.viewComponent));
  }
}
