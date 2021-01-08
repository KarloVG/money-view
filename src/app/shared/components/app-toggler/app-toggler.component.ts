import {Component} from '@angular/core';
import { NavigationService } from 'src/app/layout/sidenav/services/navigation.service';

@Component({
  selector: 'mv-app-toggler',
  templateUrl: './app-toggler.component.html',
  styleUrls: ['./app-toggler.component.scss']
})
export class AppTogglerComponent {

  constructor(
    private _navService: NavigationService
  ) {}

  collapseSidebar() {
    this._navService.collapseSidebar = !this._navService.collapseSidebar
  }
}
