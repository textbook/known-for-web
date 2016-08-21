import { Http, RequestOptions, RequestMethod, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ActorService } from './actor.service';
import { Actor } from '../models';

describe('Service: Actor', () => {

  const endpointRegex: RegExp = /\/api\/person$/;

  let service: ActorService;

  let mockBackend: MockBackend;
  let httpWithMockBackend: Http;

  beforeEach(() => {
    mockBackend = new MockBackend();
    httpWithMockBackend = new Http(mockBackend, new RequestOptions());
    service = new ActorService(httpWithMockBackend);
  });

  describe('getActor method', () => {
    it('should GET an actor from the endpoint', () => {
      let expectedResponse: Actor = { name: '' };
      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url.toString()).toMatch(endpointRegex);
        expect(connection.request.method).toEqual(RequestMethod.Get);

        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: expectedResponse,
        })));
      });

      service.getActor().subscribe(response => expect(response).toEqual(expectedResponse));
    });
  });

});
