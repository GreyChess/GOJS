import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'flyingHeroes',
  pure: false
})

export class FlyingHeroesPipe implements PipeTransform{
  transform(allHeroes: any[], para: any): any {
    return allHeroes.filter(function(hero){
      return hero.canFly;
    })
  }
}
