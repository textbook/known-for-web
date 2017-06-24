import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Actor, showDefault } from './models';

import { environment } from '../../environments/environment';

@Injectable()
export class GameService {
  static redactedTitle = '...';
  static whoops = {
    name: 'Something\'s wrong',
    image_url: 'http://www.fillmurray.com/185/278',
  };

  constructor(private http: Http) { }

  getActor(): Observable<Actor> {
    return this.http
      .get(`${environment.apiBaseUrl}/person`)
      .map(response => this.processActorResponse(response))
      .catch((err: Response) => {
        console.error(`Failed to fetch actor ([${err.status}] ${err.statusText})`);
        return Observable.of(GameService.whoops);
      });
  }

  getMovieTitles(title: string) {
    const search = new URLSearchParams();
    search.set('query', title);
    return this.http
        .get(`${environment.apiBaseUrl}/search`, { search })
        .map(response => response.json())
        .catch((err: Response) => {
          console.error(`Failed to fetch suggestions ([${err.status}] ${err.statusText})`);
          return Observable.of([]);
        });
  }

  processActorResponse(response: Response): Actor {
    let regex: RegExp;
    const actor: Actor = response.json();
    for (const movie of actor.known_for || []) {
      movie.shown = showDefault;
      if (movie.title && movie.synopsis) {
        regex = new RegExp(movie.title, 'i');
        if (movie.synopsis.match(regex)) {
          movie.synopsis = movie.synopsis.replace(regex, GameService.redactedTitle);
        }
      }
    }
    return actor;
  }
}
