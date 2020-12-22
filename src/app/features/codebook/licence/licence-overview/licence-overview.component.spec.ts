import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceOverviewComponent } from './licence-overview.component';

describe('LicenceOverviewComponent', () => {
  let component: LicenceOverviewComponent;
  let fixture: ComponentFixture<LicenceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenceOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
