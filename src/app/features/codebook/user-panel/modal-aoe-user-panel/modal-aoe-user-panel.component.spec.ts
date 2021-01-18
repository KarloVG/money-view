import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAoeUserPanelComponent } from './modal-aoe-user-panel.component';

describe('ModalAoeUserPanelComponent', () => {
  let component: ModalAoeUserPanelComponent;
  let fixture: ComponentFixture<ModalAoeUserPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAoeUserPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAoeUserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
