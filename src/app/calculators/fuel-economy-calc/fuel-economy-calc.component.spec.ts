import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelEconomyCalcComponent } from './fuel-economy-calc.component';

describe('FuelEconomyCalcComponent', () => {
  let component: FuelEconomyCalcComponent;
  let fixture: ComponentFixture<FuelEconomyCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelEconomyCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelEconomyCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
