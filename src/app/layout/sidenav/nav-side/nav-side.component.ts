import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../services/sidenav.service';
import { Router } from '@angular/router';
import { IMenuItem, NavigationService } from '../services/navigation.service';

@Component({
  selector: 'mv-nav-side',
  templateUrl: './nav-side.component.html',
  styleUrls: ['./nav-side.component.scss']
})
export class NavSideComponent implements OnInit {
  
  menus: IMenuItem[] = [];

  constructor(
    public _sideNavService: SideNavService, 
    public _router: Router,
    private _navService: NavigationService
    ) {
      console.log(_router)
     }

  ngOnInit(): void {
    this._navService.publishNavigationChange(false);
    this._navService.menuItems$
      .subscribe((items) => {
        this.menus = items;
      });
  }
}
