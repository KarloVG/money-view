import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelOverviewComponent } from './user-panel-overview.component';

describe('UserPanelOverviewComponent', () => {
  let component: UserPanelOverviewComponent;
  let fixture: ComponentFixture<UserPanelOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPanelOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
