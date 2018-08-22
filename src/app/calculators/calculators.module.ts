import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarEconomyCalcComponent } from './car-economy-calc/car-economy-calc.component';
import { FuelEconomyCalcComponent } from './fuel-economy-calc/fuel-economy-calc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalcService } from './car-economy-calc/services/calc-service';
import { CompareComponent } from './car-economy-calc/components/compare/compare.component';
import { CalculatorsRoutingModule } from './calculators-routing.module';
import { FuelEconomyService } from './fuel-economy-calc/services/fuel-economy.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalculatorsRoutingModule
  ],
  declarations: [CarEconomyCalcComponent, FuelEconomyCalcComponent, CompareComponent],
  exports: [CarEconomyCalcComponent, FuelEconomyCalcComponent, CompareComponent],
  providers: [CalcService, FuelEconomyService]
})
export class CalculatorsModule { }
