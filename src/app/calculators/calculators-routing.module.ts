import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarEconomyCalcComponent } from './car-economy-calc/car-economy-calc.component';
import { FuelEconomyCalcComponent } from './fuel-economy-calc/fuel-economy-calc.component';
import { AdministratorComponent } from './car-economy-calc/admin/administrator.component';

export const routes: Routes = [
    { path: '', component: CarEconomyCalcComponent },
    { path: 'config', component: AdministratorComponent},
    { path: 'carro-proprio',
            component: CarEconomyCalcComponent,
            children: [
                { path: 'config', component: AdministratorComponent},
              ]
            },
    { path: 'rendimento',
        component: FuelEconomyCalcComponent,
        children: [
            { path: 'config', component: AdministratorComponent},
        ]
    }
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
