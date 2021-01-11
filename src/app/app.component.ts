import {transition, trigger, useAnimation} from '@angular/animations';
import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {fadeIn} from 'ng-animate';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';

@Component({
  selector: 'mv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))])]
})
export class AppComponent implements OnInit, OnDestroy {
  @Input() theme: Theme = 'light';

  showHeader = false;
  showSidebar = false;
  showFooter = false;

  mainContentClass: MainContentClass = 'container';

  readonly subscriptions = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events
        .subscribe(event => {
          if (event instanceof NavigationStart) {
            this.spinner.show();
          }
          if (event instanceof NavigationEnd) {
            const snapshotData = this.activatedRoute.firstChild?.snapshot?.data;
            setTimeout(() => this.spinner.hide(), 500); //samo zbog izgleda
            if (!snapshotData) {
              return;
            }

            this.showHeader = snapshotData.showHeader !== false;
            this.showSidebar = snapshotData.showSidebar !== false;
            this.showFooter = snapshotData.showFooter !== false;

            if (snapshotData?.mainContentClass as MainContentClass) {
              this.mainContentClass = snapshotData.mainContentClass;
            } else if (snapshotData?.mainContentClass === null) {
              this.mainContentClass = '';
            } else {
              this.mainContentClass = 'container';
            }
          }
        }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

type Theme = 'light' | 'dark' | 'hc-light' | 'hc-dark';
type MainContentClass = string | string[] | Set<string>;
