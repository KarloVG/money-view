import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'mv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events
        .subscribe(event => {
          if (event instanceof NavigationEnd) {
            const snapshotData = this.activatedRoute.firstChild?.snapshot?.data;

            if (snapshotData) {
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
          }
        }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

type Theme = 'light' | 'dark' | 'hc-light' | 'hc-dark';
type MainContentClass = string | string[] | Set<string>;
