import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { Actor } from '../models';

@Injectable()
export class ActorService {

  constructor(private http: Http) { }

  getActor(): Observable<Actor> {
    return this.http
      .get('https://known-for-api.cfapps.pez.pivotal.io/api/person')
      .map(response => response.json());
  }
}
