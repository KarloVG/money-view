import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupModule } from './group/group.module';
import { GroupAndCompanyOverviewComponent } from './group-and-company-overview/group-and-company-overview.component';
import { CompanyModule } from './company/company.module';
import { JoyrideModule } from 'ngx-joyride';

@NgModule({
  declarations: [GroupAndCompanyOverviewComponent],
  imports: [
    CommonModule,
    GroupModule,
    CompanyModule,
    JoyrideModule.forRoot(),
    // Malo ruta pa nema potrebe za novim file-om
    RouterModule.forChild([
      {
        path: '',
        component: GroupAndCompanyOverviewComponent
      }
    ])
  ]
})
export class GroupAndCompanyModule { }
