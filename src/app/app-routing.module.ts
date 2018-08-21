import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarEconomyCalcComponent } from './calculators/car-economy-calc/car-economy-calc.component';
import { FuelEconomyCalcComponent } from './calculators/fuel-economy-calc/fuel-economy-calc.component';

export const routes: Routes = [
    { path: 'calculators', loadChildren: './calculators/calculators.module#CalculatorsModule' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}
