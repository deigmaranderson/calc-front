import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarEconomyCalcComponent } from './car-economy-calc.component';

describe('CarEconomyCalcComponent', () => {
  let component: CarEconomyCalcComponent;
  let fixture: ComponentFixture<CarEconomyCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarEconomyCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarEconomyCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
