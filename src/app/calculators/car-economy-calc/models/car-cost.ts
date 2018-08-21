export class CarCost {
    fixedCost: number;
    fuelCost: number;
    parkingCost: number;
    washCost: number;
    maintenceCost: number;
    total: number;

    constructor(
        fixedCost: number,
        fuelCost: number,
        parkingCost: number,
        washCost: number,
        maintenceCost: number) {
            this.fixedCost = fixedCost;
            this.fuelCost = fuelCost;
            this.maintenceCost = maintenceCost;
            this.parkingCost = parkingCost;
            this.washCost = washCost;
            this.total = this.fixedCost + this.fuelCost + this.maintenceCost + this.parkingCost + this.washCost;
        }
}
