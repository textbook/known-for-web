import { TestBed } from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  RequestMethod,
  RequestOptions,
  Response,
  ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ActorService } from './actor.service';
import { Actor } from '../models';
import { Movie } from '../models/movie';

describe('Service: Actor', () => {
  let mockBackend: MockBackend;
  let service: ActorService;

  const endpointRegex: RegExp = /\/api\/person$/;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RequestOptions, useClass: BaseRequestOptions },
        { provide: ConnectionBackend, useClass: MockBackend },
        Http,
        { provide: ActorService, useClass: ActorService },
        { provide: MockBackend, useClass: MockBackend },
        { provide: BaseRequestOptions, useClass: BaseRequestOptions }
      ]
    });
    mockBackend = TestBed.get(MockBackend);
    service = TestBed.get(ActorService);
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

      service.getActor().subscribe(response => {
        expect(response).toEqual(expectedResponse);
      });
    });

    it('should redact the movie title from the synopsis', () => {
      let spy = spyOn(service, 'processResponse').and.callThrough();
      let title = 'Some Movie';
      let synopsis = `This movie is called ${title} but that's a secret...`;

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          status: 200,
          body: <Actor>{ name: 'Some Actor', known_for: [<Movie>{ title, synopsis }] },
        })));
      });

      service.getActor().subscribe(response => {
        expect(spy).toHaveBeenCalled();
        expect(response.known_for[0].synopsis).not.toContain(title);
      });
    });

    it('should return dummy data on whoops', () => {
      let spiedConsole = spyOn(console, 'error');

      mockBackend.connections.subscribe(connection => {
        expect(connection.request.url.toString()).toMatch(endpointRegex);
        expect(connection.request.method).toEqual(RequestMethod.Get);

        connection.mockError(<Error>{ status: 999, message: 'panic!', name: 'problem' });
      });

      service.getActor().subscribe(response => {
        expect(spiedConsole).toHaveBeenCalled();
        expect(response).toEqual(ActorService.whoops);
      });
    });
  });

  describe('processResponse method', () => {
    let response: any;

    beforeEach(() => {
      response = jasmine.createSpyObj('Response', ['json']);
    });

    it('should be case-insensitive', () => {
      let synopsis = 'This contains tHe tItLe but not in the same case';
      response.json.and.returnValue({ known_for: [{ title: 'The Title', synopsis }] });

      let result = service.processResponse(response);

      expect(result.known_for[0].synopsis).toBe('This contains ... but not in the same case');
    });

    it('should not alter synopses without the title in', () => {
      let synopsis = 'The title is not in this';
      response.json.and.returnValue({ known_for: [{ title: 'something else', synopsis }] });

      let result = service.processResponse(response);

      expect(result.known_for[0].synopsis).toBe(synopsis);
    });

    it('should process all movies', () => {
      response.json.and.returnValue({
        known_for: [
          { title: 'First Title', synopsis: 'First synopsis without title' },
          { title: 'Second Title', synopsis: 'Second synopsis contains second title to remove' },
          { title: 'Third Title', synopsis: 'Third title synopsis should also be processed' },
        ]
      });

      let result = service.processResponse(response);

      expect(result.known_for[0].synopsis).toBe('First synopsis without title');
      expect(result.known_for[1].synopsis).toBe('Second synopsis contains ... to remove');
      expect(result.known_for[2].synopsis).toBe('... synopsis should also be processed');
    });

    it('should handle missing synopses and titles', () => {
      response.json.and.returnValue({
        known_for: [
          { title: 'First Title' },
          { synopsis: 'Second synopsis contains second title to remove' },
          {},
        ]
      });

      let result = service.processResponse(response);

      expect(result.known_for.length).toBe(3);
    });
  });
});
