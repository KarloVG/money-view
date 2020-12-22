import { Injectable } from '@angular/core';
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

  constructor() { }

  getMenu(): IMenuItem[]{
    return [
      {
        id: 1,
        name:'Šifrarnici',
        path: '',
        children: [
          {
            id: 2,
            name: 'Grupa i Firme',
            path: '/codebook/group-and-company'
          },
          {
            id:3,
            name: 'Računi',
            path: '/codebook/account'
          },
          {
            id: 4,
            name: 'Banke',
            path: '/codebook/bank'
          }
        ]
      },
      {
        id: 5,
        name:'User management',
        path: '/codebook/user-panel',
        children: []
      }
    ];
  }

  menuItems = new BehaviorSubject<IMenuItem[]>(this.getMenu());
  menuItems$ = this.menuItems.asObservable();

  publishNavigationChange(bool: boolean) {
      if (bool) {
          this.menuItems.next([]);
      } else {
          this.menuItems.next(this.getMenu());
      }
  }
}
