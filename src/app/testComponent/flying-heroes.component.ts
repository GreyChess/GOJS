import {Component} from '@angular/core';
import {HeroService} from '../hero.service';

@Component({
  selector: 'flying-heroes',
  template: `    
    new Hero:
    <input type="text" #box (keyup.enter)="addHero(box.value); box.value=''"
           placeholder="hero name">
    <div *ngFor="let hero of (heroes | flyingHeroes)">
      {{hero.name}}
    </div>
  `
})

export class FlyingHeroesComponent {
  heroes: any[] = [];
  canFly = true;
  constructor(private heroService: HeroService){
    this.reset();
  }
  addHero(name: string){
    name = name.trim();
    if(!name){
      return;
    }
    let hero = {
      name: name,
      canFly: this.canFly
    };
    this.heroes.push(hero);
  }

  reset(){
    let self = this;
    this.heroService.getHeroes().subscribe(function(heroes){
      self.heroes = heroes;
    })
  }
}
