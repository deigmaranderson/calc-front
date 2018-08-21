import { CityCost } from './city-cost';

export class PopCost {
    baseTax = 2.65;
    distancePerPrize = 1.17;
    timePerPrize = 0.18;
    superKMTrigger = 8;
    superKMExtra = 0.33;
    minimumTax = 6.5;
    takeRate = 0.1499;
    cityParams: CityCost;
}
