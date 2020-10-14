import {Component, Input} from '@angular/core';

@Component({
  selector: 'mv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input() theme: Theme = 'light';
}

type Theme = 'light' | 'dark' | 'hc-light' | 'hc-dark';
