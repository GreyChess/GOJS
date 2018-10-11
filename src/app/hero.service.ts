import {Injectable} from '@angular/core';
import {Hero} from './hero';
import {Observable, of} from 'rxjs/index';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  getHeroes(): Observable<Hero[]> {
    const self = this;
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => self.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=>this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation='operation', result?: T){
    const self = this;
    return function(error: any): Observable<T>{
      console.log(error);
      self.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_=> this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
}
