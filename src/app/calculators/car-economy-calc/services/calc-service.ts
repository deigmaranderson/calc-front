import { Injectable } from '@angular/core';
import { CarEconomy } from '../models/car-economy';
import { CalculatorParams } from '../models/calculator-params';
import { Http } from '@angular/http';
import { POPCost } from '../models/pop-cost';
import { CarCost } from '../models/car-cost';
import { Field } from '../../../shared/models/field';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CalcService {

    constructor(private http: Http) {}

    maintenceCalc(param: CalculatorParams, form: CarEconomy) {
        return (param.maintenceCost * Number(form.drivingDistance) * Number(form.travelsPerDay) * 52);
    }

    fuelCalc(param: CalculatorParams, form: CarEconomy) {
        return (Number(form.fuelCost) / Number(form.fuelConsumption)) * Number(form.drivingDistance) *
            Number(form.travelsPerDay) * Number(form.drivingDays);
    }

    parkingCalc(form: CarEconomy) {
        return Number(form.parkingCost) * 12;
    }

    washCalc(param: CalculatorParams) {
        return param.carWash * 12;
    }

    fixedCostCalc(param: CalculatorParams, form: CarEconomy) {
        return (Number(form.carCost) *
            (param.IPVA + param.deprecation + param.poupanca)) + param.DPVAT + param.CRLV + Number(form.insuranceCost);
    }

    distanceCostCalc(param: CalculatorParams, distance: number) {
        return distance > param.cityParams.triggerSuperKM
            ? this.longDistanceCalc(param, distance)
            : distance * param.cityParams.distanceTax;
    }

    // receive distance and calculator params
    longDistanceCalc(param: CalculatorParams, distance: number) {
        return (param.cityParams.triggerSuperKM * param.cityParams.distanceTax)
            + (Number(distance) - param.cityParams.triggerSuperKM) * param.cityParams.superKMTax;
    }

    distanceMinuteCostCalc(param: CalculatorParams, distance: number) {
        return (60 * distance / param.cityParams.citySpeed) * param.cityParams.timeTax;
    }

    longDistanceWithIntegrationCalc(param: CalculatorParams, form: CarEconomy) {
        return (param.cityParams.triggerSuperKM * param.cityParams.distanceTax)
            + (Number(form.drivingDistance) - param.cityParams.triggerSuperKM) * param.cityParams.superKMTax;
    }

    costPerTravelCalc(distanceCost: number, timeCost: number, distanceTax: number) {
        return distanceCost + timeCost + distanceTax;
    }

    totalCostPOPYear(travelWithIntegrationCost: number, travelWithoutIntegrationCost: number, form: CarEconomy) {
        return form.publicTransportIntegration === 'false' ? this.totalCostCalc(travelWithoutIntegrationCost, form)
            : this.totalCostCalc(travelWithIntegrationCost, form);
    }

    totalCostPublicTrasnpYear(publicTranpPass: number, form: CarEconomy) {
        return form.publicTransportIntegration === 'false' ? 0
            : this.totalCostCalc(publicTranpPass, form);
    }

    totalCostCalc(costTravel: number, form: CarEconomy) {
        return costTravel * Number(form.travelsPerDay) * Number(form.drivingDays) * 52;
    }

    saveCalcPopCost(data: POPCost) {
        return this.http.post('http://localhost:3000/pop-cost', data);
    }

    saveCalcCarCost(data: CarCost) {
        return this.http.post('http://localhost:3000/car-cost', data);
    }

    getFuels() {
        return this.http.get('http://localhost:3000/field-fuel');
    }

    getCitys() {
        return this.http.get('http://localhost:3000/field-city');
    }

    getCityParam(id: string) {
        return this.http.get('http://localhost:3000/city-params/' + id);
    }

}
