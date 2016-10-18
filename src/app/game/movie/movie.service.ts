import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';

@Injectable()
export class MovieService {
  static apiEndpoint: string = `${environment.apiBaseUrl}/search`;

  constructor(private http: Http) { }

  getMovieTitles(title: string) {
    let search = new URLSearchParams();
    search.set('query', title);
    return this.http
      .get(MovieService.apiEndpoint, { search })
      .map(response => response.json())
      .catch((err: Response) => {
        console.error(`Failed to fetch suggestions ([${err.status}] ${err.statusText})`);
        return Observable.from([]);
      });

  }
}
