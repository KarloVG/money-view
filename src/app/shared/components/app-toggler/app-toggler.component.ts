import {Component, OnInit} from '@angular/core';
import { IMenuItem, NavigationService } from 'src/app/layout/sidenav/services/navigation.service';

@Component({
  selector: 'mv-app-toggler',
  templateUrl: './app-toggler.component.html',
  styleUrls: ['./app-toggler.component.scss']
})
export class AppTogglerComponent implements OnInit{

  menus: IMenuItem[] = [];

  constructor(
    private _navService: NavigationService
  ) {}

  ngOnInit(): void {
    this._navService.menuItems$
      .subscribe((items) => {
        this.menus = items;
    });
  }

  collapseSidebar(): void {
    this._navService.collapseSidebar = !this._navService.collapseSidebar
  }
}
