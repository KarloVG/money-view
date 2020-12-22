import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAoeLicenceComponent } from './modal-aoe-licence.component';

describe('ModalAoeLicenceComponent', () => {
  let component: ModalAoeLicenceComponent;
  let fixture: ComponentFixture<ModalAoeLicenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAoeLicenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAoeLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
