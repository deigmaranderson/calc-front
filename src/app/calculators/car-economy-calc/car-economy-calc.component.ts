import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CalculatorParams, CityParams } from './models/calculator-params';
import { CarEconomy } from './models/car-economy';
import { CarCost } from './models/car-cost';
import { POPCost } from './models/pop-cost';
import { CalcService } from './services/calc-service';
import { Field } from '../../shared/models/field';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-car-economy-calc',
  templateUrl: './car-economy-calc.component.html',
  styleUrls: ['./car-economy-calc.component.css']
})
export class CarEconomyCalcComponent implements OnInit {

  formCarEconomy: FormGroup;
  @ViewChild('publicTransportIntegration') publicTransportIntegration: ElementRef;
  displayIntegrationQuestions = false;
  publicTranspFormControl: any;
  calcParams: CalculatorParams;
  costOurCar: CarCost = new CarCost(0, 0, 0, 0, 0);
  costPop: POPCost = new POPCost(0, 0, 0, 0, 0, 0, 0, 0);

  fuelField: Field[] = [];
  cityField: Field[] = [];

  constructor(private calcService: CalcService) { }

  ngOnInit() {
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
    this.formCarEconomy = new FormGroup({
      city: new FormControl('', Validators.required),
      drivingDays: new FormControl('', Validators.required),
      drivingDistance: new FormControl('', Validators.required),
      travelsPerDay: new FormControl('', Validators.required),
      fuelType: new FormControl('', Validators.required),
      fuelConsumption: new FormControl('', Validators.required),
      fuelCost: new FormControl('', Validators.required),
      carCost: new FormControl('', Validators.required),
      insuranceCost: new FormControl('', Validators.required),
      parkingCost: new FormControl('', Validators.required),
      publicTransportIntegration: new FormControl(''),
      divingDistanceIntegration: new FormControl(''),
    });
  }

  calc() {
    if (!this.formCarEconomy.valid) {
      return;
    }
    this.calcService.getCityParam(this.formCarEconomy.controls['city'].value)
      .subscribe(
        (val) => {
          const list: CityParams[] = <CityParams[]>val.json();
          this.calcParams = new CalculatorParams(list[0]);
          this.executeCalc();
        }
      );
  }

  executeCalc() {
    this.costOurCar = new CarCost(
      this.calcService.fixedCostCalc(this.calcParams, this.formCarEconomy.value),
      this.calcService.fuelCalc(this.calcParams, this.formCarEconomy.value),
      this.calcService.parkingCalc(this.formCarEconomy.value),
      this.calcService.washCalc(this.calcParams),
      this.calcService.maintenceCalc(this.calcParams, this.formCarEconomy.value)
    );

    const POP_WITH_INTEG_TRAVEL_COST = this.calcService.distanceCostCalc(this.calcParams,
      Number(this.formCarEconomy.controls['drivingDistance'].value));
    const POP_WITHOUT_INTEG_TRAVEL_COST = this.calcService.distanceCostCalc(this.calcParams,
      Number(this.formCarEconomy.controls['divingDistanceIntegration'].value));
    const TOTAL_COST_PUBLIC_TRANSPORT = this.calcService.totalCostPOPYear(Number(this.formCarEconomy.controls['drivingDistance'].value),
      Number(this.formCarEconomy.controls['divingDistanceIntegration'].value), this.formCarEconomy.value);
    const TOTAL_COST_POP = this.calcService.totalCostPublicTrasnpYear(this.calcParams.cityParams.publicTranpPass,
      this.formCarEconomy.value);

    this.costPop = new POPCost(
      this.calcService.distanceCostCalc(this.calcParams, Number(this.formCarEconomy.controls['drivingDistance'].value)),
      this.calcService.distanceMinuteCostCalc(this.calcParams, Number(this.formCarEconomy.controls['drivingDistance'].value)),
      this.calcService.distanceCostCalc(this.calcParams, Number(this.formCarEconomy.controls['divingDistanceIntegration'].value)),
      this.calcService.distanceMinuteCostCalc(this.calcParams, Number(this.formCarEconomy.controls['divingDistanceIntegration'].value)),
      POP_WITH_INTEG_TRAVEL_COST,
      POP_WITHOUT_INTEG_TRAVEL_COST,
      TOTAL_COST_POP,
      TOTAL_COST_PUBLIC_TRANSPORT
    );
    this.costOurCar.total = Math.round(this.costOurCar.total);
    this.costPop.total = Math.round(this.costPop.total);

    this.calcService.saveCalcPopCost(this.costPop).subscribe((val) => {});
    this.calcService.saveCalcCarCost(this.costOurCar).subscribe((val) => {});
  }

  displayIntegrationQuestion() {
    this.displayIntegrationQuestions = this.publicTransportIntegration.nativeElement.checked;
  }

}
