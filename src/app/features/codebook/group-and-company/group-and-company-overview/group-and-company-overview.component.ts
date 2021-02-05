import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppTourService } from 'src/app/shared/services/app-tour/app-tour.service';

@Component({
  selector: 'mv-group-and-company-overview',
  templateUrl: './group-and-company-overview.component.html',
  styleUrls: ['./group-and-company-overview.component.scss'],
  providers: [AppTourService]
})
export class GroupAndCompanyOverviewComponent implements OnInit, AfterViewInit {

  tourName: string = 'group-company-tour';

  constructor(private appTour: AppTourService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //APP TOUR
    this.appTour.isTourActive(this.tourName, true)
  }
  //APPTOUR
  tour() {
    this.appTour.showTour(this.tourName)
  }

}
