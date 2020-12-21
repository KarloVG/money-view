import {Component} from '@angular/core';
import { SideNavService } from '../sidenav/services/sidenav.service';

@Component({
  selector: 'mv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public sideNavService: SideNavService){}
}
