import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CarCost } from '../../models/car-cost';
import { POPCost } from '../../models/pop-cost';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit, OnChanges {

  @Input() costOurCar: CarCost;
  @Input() costPop: POPCost;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.costOurCar = changes.costOurCar.currentValue;
    this.costPop = changes.costPop.currentValue;
  }

}
