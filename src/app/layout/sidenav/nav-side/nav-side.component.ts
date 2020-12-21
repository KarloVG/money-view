import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../services/sidenav.service';

@Component({
  selector: 'mv-nav-side',
  templateUrl: './nav-side.component.html',
  styleUrls: ['./nav-side.component.scss']
})
export class NavSideComponent implements OnInit {

  constructor(public sideNavService: SideNavService) { }

  ngOnInit(): void {
  }

}
