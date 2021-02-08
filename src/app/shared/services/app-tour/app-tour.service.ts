
import { Injectable } from '@angular/core';
import { JoyrideService } from 'ngx-joyride';
import { IAppTour } from '../../models/app-tour';

@Injectable({
  providedIn: 'root'
})
export class AppTourService {

  data: IAppTour[] = [
    {
      name: 'user-panel-tour',
      active: true
    },
    {
      name: 'bank-tour',
      active: true
    },
    {
      name: 'group-company-tour',
      active: true
    },
    {
      name: 'account-tour',
      active: true
    },
    {
      name: 'licence-tour',
      active: true
    }
  ];

  constructor(private joyrideService: JoyrideService) { }

  isTourActive(name: string, additionalStep: boolean, position?: boolean) {
    const token = localStorage.getItem('app tour')
    this.data = JSON.parse(token!)
    if (this.data.find(e => e.name == name)?.active) {
      const steps = additionalStep ? ['step1', 'step2'] : ['step1']
      const positions = position ? 'center' : 'bottom'
      setTimeout(() => {
        this.joyrideService.startTour(
          {
            steps: steps,
            stepDefaultPosition: positions,
            themeColor: "#288ab5"
          }
        );
      }, 1500);
    }
  }

  showTour(tourname: string) {
    this.data.find(item => item.name == tourname)!.active = false;
    localStorage.setItem('app tour', JSON.stringify(this.data))
  }

  tourActivity() {
    const token = localStorage.getItem('app tour')
    if (!token) {
      localStorage.setItem('app tour', JSON.stringify(this.data))
    }
  }
}
