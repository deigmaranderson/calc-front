import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Gain } from '../models/gain';

@Injectable()
export class FuelEconomyService {

    constructor(private http: Http) {}

    getCostUber(id: string) {
        return this.http.get('http://localhost:3000/city-params-uber/' + id);
    }

    getCostPop(id: string) {
        return this.http.get('http://localhost:3000/city-params-pop/' + id);
    }

    saveCalc(data: Gain) {
        return this.http.post('http://localhost:3000/car-cost', data);
    }

}
