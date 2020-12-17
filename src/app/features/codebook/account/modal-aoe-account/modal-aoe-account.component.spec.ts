import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAoeAccountComponent } from './modal-aoe-account.component';

describe('ModalAoeAccountComponent', () => {
  let component: ModalAoeAccountComponent;
  let fixture: ComponentFixture<ModalAoeAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAoeAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAoeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
