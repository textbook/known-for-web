import { inject, TestBed } from '@angular/core/testing';
import {
  Http,
  RequestMethod,
  ResponseOptions,
  Response,
  ConnectionBackend,
  BaseRequestOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ActorService } from './actor.service';
import { Actor } from '../models';

describe('Service: Actor', () => {

  const endpointRegex: RegExp = /\/api\/person$/;

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
        { provide: ActorService, useClass: ActorService },
        { provide: MockBackend, useClass: MockBackend },
        { provide: BaseRequestOptions, useClass: BaseRequestOptions }
      ]
    });
  });

  describe('getActor method', () => {
    it('should GET an actor from the endpoint', inject([MockBackend, ActorService], (backend: MockBackend, service: ActorService) => {
      let expectedResponse: Actor = { name: '' };

      backend.connections.subscribe(connection => {
        expect(connection.request.url.toString()).toMatch(endpointRegex);
        expect(connection.request.method).toEqual(RequestMethod.Get);

        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: expectedResponse,
        })));
      });

      service.getActor().subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });
    }));
  });

});
