import { Component, OnInit } from '@angular/core';
import { JoyrideService } from 'ngx-joyride';

@Component({
  selector: 'mv-group-and-company-overview',
  templateUrl: './group-and-company-overview.component.html',
  styleUrls: ['./group-and-company-overview.component.scss']
})
export class GroupAndCompanyOverviewComponent implements OnInit {

  tourGroupCompany: boolean = true;

  constructor(private joyrideService: JoyrideService) { }

  ngOnInit(): void {
    //APP TOUR
    const token = localStorage.getItem('tour-group-company');
    if (token) {
      this.tourGroupCompany = JSON.parse(token);
    }
    if (this.tourGroupCompany) {
      setTimeout(() => {
        this.joyrideService.startTour(
          {
            steps: ['step1', 'step2'],
            themeColor: "#288ab5"
          }
        );
      }, 1500);
    }
  }

  //APP TOUR
  showTour(): void {
    this.tourGroupCompany = false;
    localStorage.setItem('tour-group-company', JSON.stringify(this.tourGroupCompany));
  }

}
