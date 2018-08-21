import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Field } from '../../shared/models/field';
import { CalcService } from '../car-economy-calc/services/calc-service';

@Component({
  selector: 'app-fuel-economy-calc',
  templateUrl: './fuel-economy-calc.component.html',
  styleUrls: ['./fuel-economy-calc.component.css']
})
export class FuelEconomyCalcComponent implements OnInit {

  formFuelEconomy: FormGroup;
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
    this.formFuelEconomy = new FormGroup({
      city: new FormControl('', Validators.required),
      drivingDays: new FormControl('', Validators.required),
      fuelType: new FormControl('', Validators.required),
      fuelConsumption: new FormControl('', Validators.required),
      workHours: new FormControl('', Validators.required),
    });

  }

  calc() {
    console.log(this.formFuelEconomy.value);
  }

}
