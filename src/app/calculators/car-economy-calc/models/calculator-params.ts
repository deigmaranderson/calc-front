export class CalculatorParams {
    maintenceCost = 2.65;
    IPVA = 0.04;
    deprecation = 0.08;
    poupanca = 0.045;
    DPVAT = 68;
    CRLV = 85;
    carWash = 20;
    cityParams: CityParams;

    constructor(city: CityParams) {
        this.cityParams = city;
    }
}

export class CityParams {
    baseTax: number;
    distanceTax: number;
    timeTax: number;
    cityTax: number;
    triggerSuperKM: number;
    superKMTax: number;
    citySpeed: number;
    publicTranpPass: number;
    dynamicPrice: number;
}
