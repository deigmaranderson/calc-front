import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Field } from '../../shared/models/field';
import { CalcService } from '../car-economy-calc/services/calc-service';
import { Gain } from './models/gain';
import { CityCost } from './models/city-cost';
import { UberCost } from './models/uber-cost';
import { PopCost } from './models/pop-cost';
import { FuelEconomyService } from './services/fuel-economy.service';

@Component({
  selector: 'app-fuel-economy-calc',
  templateUrl: './fuel-economy-calc.component.html',
  styleUrls: ['./fuel-economy-calc.component.css']
})
export class FuelEconomyCalcComponent implements OnInit {

  formFuelEconomy: FormGroup;
  fuelField: Field[] = [];
  cityField: Field[] = [];
  uberValue: Gain;
  popValue: Gain;
  uberParam: CityCost;
  popParam: CityCost;
  popCost: PopCost = new PopCost();
  uberCost: UberCost = new UberCost();


  constructor(private calcService: CalcService, private fuelEconomyService: FuelEconomyService) { }

  ngOnInit() {
    this.popParam = {
      TPH: 1.7,
      PAX: 3,
      travelDistance: 6,
      ASP: 12.37,
      alcoholPrize: 3.11,
      gasolinePrize: 4.7,
      GNVPrize: 2.2,
      travelTime: 15
    };

    this.uberParam = {
      TPH: 1.9,
      PAX: 3,
      travelDistance: 6,
      travelTime: 15,
      ASP: 10.39,
      alcoholPrize: 3.11,
      gasolinePrize: 4.7,
      GNVPrize: 2.2
    };
    this.calcService.getCitys()
      .subscribe(
        (val: any) => {
          const list: { id: string, description: string }[] = <{ id: string, description: string }[]>val.json();
          this.cityField = list;
        }
      );

    this.calcService.getFuels()
      .subscribe(
        (val: any) => {
          const list: { id: string, description: string }[] = <{ id: string, description: string }[]>val.json();
          this.fuelField = list;
        }
      );
    this.formFuelEconomy = new FormGroup({
      city: new FormControl('', Validators.required),
      drivingDays: new FormControl('', Validators.required),
      fuelType: new FormControl('', Validators.required),
      fuelConsumption: new FormControl('', Validators.required),
      workHours: new FormControl('', Validators.required),
    });

  }

  calcOneMoreHour() {
    const workHourMounth = this.formFuelEconomy.controls['drivingDays'].value
      * (this.formFuelEconomy.controls['workHours'].value + 1) * 4;

    const travelMounthPop = workHourMounth * this.popParam.TPH;
    const travelDistancePop = travelMounthPop * (this.popParam.PAX + this.popParam.travelDistance);
    const gainMounthPopWithoutTax = this.popParam.ASP * travelMounthPop;
    const mounthPopTax = gainMounthPopWithoutTax * this.popCost.takeRate;
    const selectedFuel = this.fuelField.filter(
      (val) => {
        return val.id === this.formFuelEconomy.controls['fuelType'].value;
      });
    let fuelCost;
    if (selectedFuel.length > 0) {
      switch (selectedFuel[0].description) {
        case 'GNV':
          fuelCost = this.calcFuel(travelDistancePop, this.popParam.GNVPrize, this.formFuelEconomy.controls['fuelConsumption'].value);
          break;
        case 'álcool':
          fuelCost = this.calcFuel(travelDistancePop, this.popParam.alcoholPrize, this.formFuelEconomy.controls['fuelConsumption'].value);
          break;
        case 'gasolina':
          fuelCost = this.calcFuel(travelDistancePop, this.popParam.gasolinePrize, this.formFuelEconomy.controls['fuelConsumption'].value);
          break;
        default:
          fuelCost = 0;
          break;
      }
    } else {
      fuelCost = 0;
    }

    return gainMounthPopWithoutTax - (fuelCost + mounthPopTax);
  }

  executeCalcPop() {
    const workHourMounth = this.formFuelEconomy.controls['drivingDays'].value
      * this.formFuelEconomy.controls['workHours'].value * 4;
    const travelMounthPop = workHourMounth * this.popParam.TPH;
    const travelDistancePop = travelMounthPop * (this.popParam.PAX + this.popParam.travelDistance);
    const gainMounthPopWithoutTax = this.popParam.ASP * travelMounthPop;
    const mounthPopTax = gainMounthPopWithoutTax * this.popCost.takeRate;
    const selectedFuel = this.fuelField.filter(
      (val) => {
        return val.id === this.formFuelEconomy.controls['fuelType'].value;
      });
    let fuelCost;
    if (selectedFuel.length > 0) {
      switch (selectedFuel[0].description) {
        case 'GNV':
          fuelCost = this.calcFuel(travelDistancePop, this.popParam.GNVPrize, this.formFuelEconomy.controls['fuelConsumption'].value);
          break;
        case 'álcool':
          fuelCost = this.calcFuel(travelDistancePop, this.popParam.alcoholPrize, this.formFuelEconomy.controls['fuelConsumption'].value);
          break;
        case 'gasolina':
          fuelCost = this.calcFuel(travelDistancePop, this.popParam.gasolinePrize, this.formFuelEconomy.controls['fuelConsumption'].value);
          break;
        default:
          fuelCost = 0;
          break;
      }
    } else {
      fuelCost = 0;
    }

    const popFinalGain = gainMounthPopWithoutTax - (fuelCost + mounthPopTax);
    this.popValue = new Gain();
    this.popValue.finalGain = popFinalGain;
    this.popValue.fuelCost = fuelCost;
    this.popValue.gainYear = popFinalGain * 12;
    if (selectedFuel.length > 0) {
      this.popValue.GNVKitGain = selectedFuel[0].description === 'GNV' ? 0
        : fuelCost - this.calcFuel(travelDistancePop,
          this.popParam.GNVPrize, this.formFuelEconomy.controls['fuelConsumption'].value);
    } else {
      this.popValue.GNVKitGain = 0;
    }
    this.popValue.mounthWithoutTax = gainMounthPopWithoutTax;
    this.popValue.tax = mounthPopTax;

    // workOneMoreHour
    this.popValue.workMoreHourGain = this.calcOneMoreHour();
    this.popValue.type = 'pop';

    this.fuelEconomyService.saveCalc(this.popValue);
  }

  executeCalcUber() {
    const workHourMounth = this.formFuelEconomy.controls['drivingDays'].value
      * this.formFuelEconomy.controls['workHours'].value * 4;
    const travelMounthUber = workHourMounth * this.uberParam.TPH;
    const travelDistanceUber = travelMounthUber * (this.uberParam.PAX + this.uberParam.travelDistance);
    const gainMounthUberWithoutTax = this.uberParam.ASP * travelMounthUber;
    const mounthUberTax = gainMounthUberWithoutTax * this.uberCost.takeRate;
    const selectedFuelUber = this.fuelField.filter(
      (val) => {
        return val.id === this.formFuelEconomy.controls['fuelType'].value;
      });
    let fuelCostUber;
    if (selectedFuelUber.length > 0) {
      switch (selectedFuelUber[0].description) {
        case 'GNV':
          fuelCostUber = this.calcFuel(travelDistanceUber, this.uberParam.GNVPrize, this.formFuelEconomy.controls['fuelConsumption'].value);
          break;
        case 'álcool':
          fuelCostUber = this.calcFuel(travelDistanceUber, this.uberParam.alcoholPrize,
            this.formFuelEconomy.controls['fuelConsumption'].value);
          break;
        case 'gasolina':
          fuelCostUber = this.calcFuel(travelDistanceUber, this.uberParam.gasolinePrize,
            this.formFuelEconomy.controls['fuelConsumption'].value);
          break;
        default:
          fuelCostUber = 0;
          break;
      }
    } else {
      fuelCostUber = 0;
    }
    const UberFinalGain = gainMounthUberWithoutTax - (fuelCostUber + mounthUberTax);
    this.uberValue = new Gain();
    this.uberValue.finalGain = UberFinalGain;
    this.uberValue.fuelCost = fuelCostUber;
    this.uberValue.gainYear = UberFinalGain * 12;
    if (selectedFuelUber.length > 0) {
      this.uberValue.GNVKitGain = selectedFuelUber[0].description === 'GNV' ? 0
        : fuelCostUber - this.calcFuel(travelDistanceUber,
          this.uberParam.GNVPrize, this.formFuelEconomy.controls['fuelConsumption'].value);
    } else {
      this.uberValue.GNVKitGain = 0;
    }
    this.uberValue.mounthWithoutTax = gainMounthUberWithoutTax;
    this.uberValue.tax = mounthUberTax;
    this.uberValue.workMoreHourGain = 0;
    this.uberValue.type = 'uber';

    this.fuelEconomyService.saveCalc(this.uberValue);
  }

  calc() {
    if (!this.formFuelEconomy.valid) {
      return;
    }

    this.fuelEconomyService.getCostPop(this.formFuelEconomy.controls['city'].value)
      .subscribe(
        (val) => {
          const list: CityCost[] = <CityCost[]>val.json();
          this.popParam = list[0];
          this.executeCalcPop();
        }
      );

    this.fuelEconomyService.getCostUber(this.formFuelEconomy.controls['city'].value)
      .subscribe(
        (val) => {
          const list: CityCost[] = <CityCost[]>val.json();
          this.uberParam = list[0];
          this.executeCalcUber();
        }
      );
  }

  calcFuel(distance: number, fuel: number, comsumption: number): number {
    return (distance / comsumption) * fuel;
  }

}
