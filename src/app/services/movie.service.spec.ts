import { TestBed, inject } from '@angular/core/testing';
import {
  Http, ConnectionBackend, BaseRequestOptions, RequestMethod,
  ResponseOptions, Response
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { MovieService } from './movie.service';

describe('Service: Movie', () => {
  const endpointRegex: RegExp = /\/api\/search\?query=\w+$/;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        { provide: MovieService, useClass: MovieService },
        { provide: MockBackend, useClass: MockBackend },
        { provide: BaseRequestOptions, useClass: BaseRequestOptions }
      ]
    });
  });

  describe('getMovieTitles method', () => {
    it('should GET a list of titles from the endpoint',
      inject([MockBackend, MovieService], (backend: MockBackend, service: MovieService) => {
        let expectedResponse: string[] = ['hello', 'world'];
        let guess = 'something';

        backend.connections.subscribe(connection => {
          expect(connection.request.url.toString()).toMatch(endpointRegex);
          expect(connection.request.method).toEqual(RequestMethod.Get);

          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: expectedResponse,
          })));
        });

        service.getMovieTitles(guess).subscribe(response => {
          expect(response).toEqual(expectedResponse);
        });
      }));

    it('should return an empty list on failure',
      inject([MockBackend, MovieService], (backend: MockBackend, service: MovieService) => {
        let spiedConsole = spyOn(console, 'error');
        let guess = 'something';

        backend.connections.subscribe(connection => {
          expect(connection.request.url.toString()).toMatch(endpointRegex);
          expect(connection.request.method).toEqual(RequestMethod.Get);

          connection.mockError({ status: 999, message: 'panic!'});
        });

        service.getMovieTitles(guess).subscribe(response => {
          expect(spiedConsole).toHaveBeenCalled();
          expect(response).toEqual([]);
        });
    }));
  });
});
