import { Component, OnInit } from '@angular/core';
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
    public _router: Router,
    public _navService: NavigationService
    ) { }

  ngOnInit(): void {
    this._navService.menuItems$
      .subscribe((items) => {
        this.menus = items;
        if(!items.length) {
         this._navService.collapseSidebar = true;
        }
      });
  }
}
