import {Component} from '@angular/core';

@Component({
  selector: 'app-power-boost-calulator',
  template: `
    <h2>Power Boost Calulator</h2>
    <div>Normal power: <input [(ngModel)]="power"></div>
    <div>Boost factor: <input [(ngModel)]="factor"></div>
    <p>
      Super hero Power: {{power | exponentialStrength: factor}}
    </p>
  `
})

export class PowerBoostCalculatorComponent {
  power = 5;
  factor = 1;
}
