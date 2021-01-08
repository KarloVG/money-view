import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private _router: Router){}

  navigateTo(): void {
    this._router.navigateByUrl('');
  }
}
