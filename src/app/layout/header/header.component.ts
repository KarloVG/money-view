import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../sidenav/services/navigation.service';

@Component({
  selector: 'mv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public _navService: NavigationService, private _router: Router){}

  collapseSidebar() {
    this._navService.collapseSidebar = !this._navService.collapseSidebar
  }

  navigateTo(): void {
    this._router.navigateByUrl('');
  }
}
