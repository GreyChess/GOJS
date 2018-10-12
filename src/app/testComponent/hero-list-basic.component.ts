import {Component, Input} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {Hero} from '../hero';

@Component({
  selector: 'app-hero-list-basic',
  animations: [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ],
  template: `
    <ul>
      <li *ngFor="let hero of heroes"
          [@heroState]="hero.state"
          (click)="hero.toggleState()">
        {{hero.name}}
      </li>
    </ul>
  `
})

export class HeroListBasicComponent {
  @Input() heroes: Hero[];
}
