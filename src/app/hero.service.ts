import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs/index';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(function (hero) {
      return hero.id === id;
    }));
  }

  constructor(private messageService: MessageService) {
  }
}
