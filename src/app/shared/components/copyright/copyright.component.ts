import {Component} from '@angular/core';

@Component({
  selector: 'mv-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})
export class CopyrightComponent {

  public readonly currentYear = new Date().getFullYear();

}
