import { CityCost } from './city-cost';

export class UberCost {
    baseTax = 1.5;
    distancePerPrize = 1.1625;
    timePerPrize = 0.1275;
    minimumTax = 6.75;
    takeRate = 0.25;
    cityParams: CityCost;
}
