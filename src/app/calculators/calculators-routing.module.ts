import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarEconomyCalcComponent } from './car-economy-calc/car-economy-calc.component';
import { FuelEconomyCalcComponent } from './fuel-economy-calc/fuel-economy-calc.component';


export const routes: Routes = [
    { path: '', component: CarEconomyCalcComponent },
    { path: 'carro-proprio', component: CarEconomyCalcComponent },
    { path: 'rendimento', component: FuelEconomyCalcComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class CalculatorsRoutingModule {
}
