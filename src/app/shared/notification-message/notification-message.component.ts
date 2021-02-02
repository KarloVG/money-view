import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { IFleksbitResponse } from '../models/fleksbit-response';
import { INotificationLicenceResponse } from '../models/notification-licence-response';
import { NotificationService } from '../services/swal-notification/notification.service';
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
    private _notificationMessage: NotificationMessageService,
    private _router: Router,
    private _notificationService: NotificationService
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
        if (!this.licence.isValid) {
          this._router.navigate(['/codebook/licence']);
          this._notificationService.fireErrorNotification("Došlo je do pogreške. Kontaktirajte administratora.")
        }
      })
  }

  showComponent(): void {
    this.isDisplayed = false;
  }
}
