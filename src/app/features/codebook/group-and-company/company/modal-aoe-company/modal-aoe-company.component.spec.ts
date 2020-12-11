import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAoeCompanyComponent } from './modal-aoe-company.component';

describe('ModalAoeCompanyComponent', () => {
  let component: ModalAoeCompanyComponent;
  let fixture: ComponentFixture<ModalAoeCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAoeCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAoeCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
