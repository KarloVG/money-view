import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAoeKeyComponent } from './modal-aoe-key.component';

describe('ModalAoeKeyComponent', () => {
  let component: ModalAoeKeyComponent;
  let fixture: ComponentFixture<ModalAoeKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAoeKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAoeKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
