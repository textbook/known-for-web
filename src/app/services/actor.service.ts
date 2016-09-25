import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';

import { Actor, showDefault } from '../models';

import { environment } from '../../environments/environment';

@Injectable()
export class ActorService {
  static apiEndpoint: string = `${environment.apiBaseUrl}/person`;
  static redactedTitle = '...';
  static whoops = {
    name: 'Something\'s wrong',
    image_url: 'http://www.fillmurray.com/185/278',
  };

  constructor(private http: Http) { }

  getActor(): Observable<Actor> {
    return this.http
      .get(ActorService.apiEndpoint)
      .map(response => this.processResponse(response))
      .catch((err: Response) => {
        console.error(`Failed to fetch actor ([${err.status}] ${err.statusText})`);
        return Observable.from([ActorService.whoops]);
      });
  }

  processResponse(response: Response): Actor {
    let regex: RegExp;
    let actor: Actor = response.json();
    for (let movie of actor.known_for || []) {
      movie.shown = showDefault;
      if (movie.title && movie.synopsis) {
        regex = new RegExp(movie.title, 'i');
        if (movie.synopsis.match(regex)) {
          movie.synopsis = movie.synopsis.replace(regex, ActorService.redactedTitle);
        }
      }
    }
    return actor;
  }
}
