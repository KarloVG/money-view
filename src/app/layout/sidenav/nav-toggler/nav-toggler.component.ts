import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../services/sidenav.service';

@Component({
  selector: 'mv-nav-toggler',
  templateUrl: './nav-toggler.component.html',
  styleUrls: ['./nav-toggler.component.scss']
})
export class NavTogglerComponent implements OnInit {

  constructor(public sideNavService: SideNavService) { }

  ngOnInit(): void {
  }

}
