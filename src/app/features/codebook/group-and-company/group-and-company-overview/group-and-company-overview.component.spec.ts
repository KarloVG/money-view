import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAndCompanyOverviewComponent } from './group-and-company-overview.component';

describe('GroupAndCompanyOverviewComponent', () => {
  let component: GroupAndCompanyOverviewComponent;
  let fixture: ComponentFixture<GroupAndCompanyOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupAndCompanyOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAndCompanyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
