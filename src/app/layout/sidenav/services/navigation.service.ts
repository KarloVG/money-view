import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IMenuItem {
  id: number;
  name: string;
  path: string;
  children?: IMenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public screenWidth: any
  public collapseSidebar: boolean = false
  public fullScreen = false;

  constructor() {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true
    }
  }

  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenWidth = window.innerWidth;
  }

  getMenu(): IMenuItem[] {
    return [
      {
        id: 1,
        name: 'Šifrarnici',
        path: '',
        children: [
          {
            id: 2,
            name: 'Grupa i Firme',
            path: '/codebook/group-and-company'
          },
          {
            id: 3,
            name: 'Računi',
            path: '/codebook/account'
          },
          {
            id: 4,
            name: 'Banke',
            path: '/codebook/bank'
          },
          {
            id: 6,
            name: 'Licence',
            path: '/codebook/licence'
          }
        ]
      },
      {
        id: 5,
        name: 'User management',
        path: '/codebook/user-panel',
        children: []
      }
    ];
  };

  menuItems = new BehaviorSubject<IMenuItem[]>([]);
  menuItems$ = this.menuItems.asObservable();

  publishNavigationChange(isAuthorized: boolean) {
    if (isAuthorized) {
      this.menuItems.next(this.getMenu());
    } else {
      this.menuItems.next([]);
    }
  }
}
