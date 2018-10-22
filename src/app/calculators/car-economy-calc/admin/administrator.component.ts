import { Component, OnInit } from '@angular/core';
import { CalcService } from '../services/calc-service';
import { City, CityParamsPop, CityParamsUber } from '../models/auxiliar';
import { CityParams } from '../models/calculator-params';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  mockTest = {
    description: 'Porto Alegre'
  };
  mockCityParam = {
    baseTax: 2,
    distanceTax: 2,
    timeTax: 2,
    cityTax: 2,
    triggerSuperKM: 2,
    superKMTax: 2,
    citySpeed: 2,
    publicTranpPass: 2,
    dynamicPrice: 2,
    cityId: '5bc496b95d6f2f49545967cd'
  };
  mockCityParamsPop = {
    alcoholPrize: 9,
    gasolinePrize: 3,
    travelTime: 5,
    GNVPrize: 7,
    PAX: 1,
    travelDistance: 5,
    id: 0,
    cityID: '5bc496b95d6f2f49545967cd',
    TPH: 6,
    ASP: 2
  };
  mockCityParamsUber = {
    alcoholPrize: 9,
    gasolinePrize: 3,
    travelTime: 5,
    GNVPrize: 7,
    PAX: 1,
    travelDistance: 5,
    id: 0,
    cityID: '5bc496b95d6f2f49545967cd',
    TPH: 6,
    ASP: 2
  };
  formParamsPop: FormGroup;
  formParamsUber: FormGroup;
  formCityParam: FormGroup;
  formCities: FormGroup;
  cities: any;
  showCreate = false;
  cityPopParams = new CityParamsPop;
  cityUberParams = new CityParamsUber;
  cityParams = new CityParams;

  constructor(private calcservice: CalcService) { }

  ngOnInit() {
    this.getCities();
    // this.postCity(this.mockTest);
    // this.postCityParams(this.mockCityParam);
    // this.postCityParamsPop(this.mockCityParamsPop);
    // this.getCityParamPop('5bc496b95d6f2f49545967cd');
    this.formCities = new FormGroup({
      fieldCities: new FormControl('', Validators.required),
      createCity: new FormControl('', Validators.required),
    });

    this.formParamsPop = new FormGroup({
      alcoholPrize: new FormControl('', Validators.required),
      gasolinePrize: new FormControl('', Validators.required),
      travelTime: new FormControl('', Validators.required),
      GNVPrize: new FormControl('', Validators.required),
      PAX: new FormControl('', Validators.required),
      travelDistance: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      cityID: new FormControl('', Validators.required),
      TPH: new FormControl('', Validators.required),
      ASP: new FormControl('', Validators.required),
      parkingCost: new FormControl('', Validators.required),
      publicTransportIntegration: new FormControl(''),
      divingDistanceIntegration: new FormControl(''),
    });

    this.formParamsUber = new FormGroup({
      alcoholPrize: new FormControl('', Validators.required),
      gasolinePrize: new FormControl('', Validators.required),
      travelTime: new FormControl('', Validators.required),
      GNVPrize: new FormControl('', Validators.required),
      PAX: new FormControl('', Validators.required),
      travelDistance: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      cityID: new FormControl('', Validators.required),
      TPH: new FormControl('', Validators.required),
      ASP: new FormControl('', Validators.required),
      parkingCost: new FormControl('', Validators.required),
      publicTransportIntegration: new FormControl(''),
      divingDistanceIntegration: new FormControl(''),
    });

    this.formCityParam = new FormGroup({
      baseTax: new FormControl('', Validators.required),
      distanceTax: new FormControl('', Validators.required),
      timeTax: new FormControl('', Validators.required),
      cityTax: new FormControl('', Validators.required),
      triggerSuperKM: new FormControl('', Validators.required),
      superKMTax: new FormControl('', Validators.required),
      citySpeed: new FormControl('', Validators.required),
      publicTranpPass: new FormControl('', Validators.required),
      dynamicPrice: new FormControl('', Validators.required),
      cityId: new FormControl('', Validators.required)
    });

    this.onChanges();
  }

  onChanges() {
    this.formCities.valueChanges.subscribe(
      res => {
        this.getCityParamPop(res.fieldCities);
        this.getCityParamUber(res.fieldCities);
        this.getCityParams(res.fieldCities);
        console.log(res.fieldCities);
     }
    );
  }
  showCreateCity() {
    this.showCreate = !this.showCreate;
  }

  result(res) {
    console.log('result Server ->', res);
  }

  getCities() {
    this.calcservice.getCitys().subscribe(res => this.cities = res.json());
  }

  postCity(data: City) {
    this.calcservice.postCities(data).subscribe(
      res => this.result(res),
      fail => console.log(fail)
    );
  }

  postCityParams(params: CityParams) {
    this.calcservice.postCityParams(this.mockCityParam).subscribe(
      res => this.result(res)
    );
  }

  postCityParamsPop(params: CityParamsPop) {
    this.calcservice.postCityParamsPop(this.mockCityParamsPop).subscribe(
      res => this.result(res)
    );
  }
  getCityParams(id: string) {
    this.calcservice.getCityParam(id).subscribe(
      res => {
        let tempArray = new Array();
        tempArray = res.json();
        tempArray.forEach(element => {
          this.cityParams = element;
          console.log('ee-', element);
          if (element.cityID === id) {
            console.log('---', element);
          this.formCityParam.patchValue({
            baseTax: this.cityParams.baseTax,
            distanceTax: this.cityParams.distanceTax,
            timeTax: this.cityParams.timeTax,
            cityTax: this.cityParams.cityTax,
            triggerSuperKM: this.cityParams.triggerSuperKM,
            superKMTax: this.cityParams.superKMTax,
            citySpeed: this.cityParams.citySpeed,
            publicTranpPass: this.cityParams.publicTranpPass,
            dynamicPrice: this.cityParams.dynamicPrice
            });
          }
        });
        this.result(this.cityParams);
      }
    );
  }
  getCityParamPop(id: string) {
    this.calcservice.getCityParamPop(id).subscribe(
      res => {
        let tempArray = new Array();
        tempArray = res.json();
        tempArray.forEach(element => {
          this.cityPopParams = element;
          if (element.cityID === id) {
          this.formParamsPop.patchValue({
              alcoholPrize: this.cityPopParams.alcoholPrize,
              gasolinePrize: this.cityPopParams.gasolinePrize,
              travelTime: this.cityPopParams.travelTime,
              GNVPrize: this.cityPopParams.GNVPrize,
              PAX: this.cityPopParams.PAX,
              travelDistance: this.cityPopParams.travelDistance,
              TPH: this.cityPopParams.TPH,
              ASP: this.cityPopParams.ASP
            });
          }
        });
        this.result(this.cityPopParams);
      }
    );
  }

  postCityParamsUber(params: CityParamsUber) {
    this.calcservice.postCityParamsUber(this.mockCityParamsUber).subscribe(
      res => this.result(res)
    );
  }

  getCityParamUber(id: string) {
    this.calcservice.getCityParamUber(id).subscribe(
      res => {
        let tempArray = new Array();
        tempArray = res.json();
        tempArray.forEach(element => {
          this.cityUberParams = element;
          if (element.cityID === id) {
          this.formParamsUber.patchValue({
            alcoholPrize: this.cityUberParams.alcoholPrize,
            gasolinePrize: this.cityUberParams.gasolinePrize,
            travelTime: this.cityUberParams.travelTime,
            GNVPrize: this.cityUberParams.GNVPrize,
            PAX: this.cityUberParams.PAX,
            travelDistance: this.cityUberParams.travelDistance,
            TPH: this.cityUberParams.TPH,
            ASP: this.cityUberParams.ASP
            });
          }
        });
        this.result(this.cityUberParams);
      }
    );
  }

}
