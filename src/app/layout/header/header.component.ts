import {Component} from '@angular/core';
import { Router } from '@angular/router';

import { SideNavService } from '../sidenav/services/sidenav.service';

@Component({
  selector: 'mv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public sideNavService: SideNavService, private _router: Router){}

  navigateTo(): void {
    this._router.navigateByUrl('');
    
  }
}
