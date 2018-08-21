export class POPCost {
    distanceWithoutIntegratCost: number;
    distanceWithoutIntegratMinuteCost: number;
    distanceWithIntegratCost: number;
    distanceWithIntegratMinuteCost: number;
    travelWithoutIntegratCost: number;
    travelWithIntegratCost: number;
    totalCostYear: number;
    totalCostPublicTransp: number;
    total: number;

    constructor(distanceWithoutIntegratCost: number,
        distanceWithoutIntegratMinuteCost: number,
        distanceWithIntegratCost: number,
        distanceWithIntegratMinuteCost: number,
        travelWithoutIntegratCost: number,
        travelWithIntegratCost: number,
        totalCostYear: number,
        totalCostPublicTransp: number) {
        this.distanceWithoutIntegratCost = distanceWithoutIntegratCost;
        this.distanceWithoutIntegratMinuteCost = distanceWithoutIntegratMinuteCost;
        this.distanceWithIntegratCost = distanceWithIntegratCost;
        this.distanceWithIntegratMinuteCost = distanceWithIntegratMinuteCost;
        this.travelWithoutIntegratCost = travelWithoutIntegratCost;
        this.travelWithIntegratCost = travelWithIntegratCost;
        this.totalCostYear = totalCostYear;
        this.totalCostPublicTransp = totalCostPublicTransp;
        this.total = totalCostPublicTransp + totalCostYear;
    }
}
