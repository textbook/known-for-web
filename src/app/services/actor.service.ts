import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';

import { Actor } from '../models';
import { environment } from '../environment';

@Injectable()
export class ActorService {
  static apiEndpoint: string = `${environment.apiBaseUrl}/person`;
  static whoops = {
    name: 'Something\'s wrong',
    image_url: 'http://www.fillmurray.com/185/278',
  };

  constructor(private http: Http) { }

  getActor(): Observable<Actor> {
    return this.http
      .get(ActorService.apiEndpoint)
      .map(response => response.json())
      .catch((err: Response) => {
        console.error(`Failed to fetch actor ([${err.status}] ${err.statusText})`);
        return Observable.from([ActorService.whoops]);
      });
  }
}
