import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAoeBankComponent } from './modal-aoe-bank.component';

describe('ModalAoeBankComponent', () => {
  let component: ModalAoeBankComponent;
  let fixture: ComponentFixture<ModalAoeBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAoeBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAoeBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
