import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import * as moment from 'moment';

import { ActorComponent } from './actor.component';
import { MovieComponent } from '../movie/movie.component';

import { AgePipe } from '../pipes/age.pipe';

import { ActorService } from '../services/actor.service';

describe('Component: Actor', () => {
  let fixture: ComponentFixture<ActorComponent>;
  let mockActorService: any;
  let mockRouter: any;

  beforeEach(done => {
    mockActorService = jasmine.createSpyObj('ActorService', ['getActor']);
    mockActorService.getActor.and.returnValue(Observable.from([{ name: 'Hans Muster' }]));

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ActorComponent, AgePipe, MovieComponent],
      providers: [
        { provide: ActorService, useValue: mockActorService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    TestBed.overrideComponent(MovieComponent, {
      set: {
        template: '<div class="dummy-movie"></div>',
        inputs: ['movie'],
      }
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ActorComponent);
      fixture.detectChanges();
      done();
    });
  });

  it('should show an actor\'s name', () => {
    fixture.componentInstance.actor = { name: 'Hello World' };
    fixture.detectChanges();
    expect(getActorName(fixture)).toEqual('Hello World');
  });

  it('should show three related movies', () => {
    fixture.componentInstance.actor = { name: 'Hello World', known_for: [{}, {}, {}] };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('div.dummy-movie').length).toEqual(3);
  });

  it('should show an actor\'s image', () => {
    let imageUrl = 'some.jpg';
    fixture.componentInstance.actor = { name: 'Hello World', image_url: imageUrl };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img.actor-image').src).toContain(imageUrl);
  });

  it('should retrieve an actor on init', () => {
    expect(mockActorService.getActor).toHaveBeenCalled();
    expect(getActorName(fixture)).toEqual('Hans Muster');
  });

  it('should show the actor\'s age', () => {
    let thirty_eight = moment().subtract(38, 'years').subtract(2, 'weeks');
    fixture.componentInstance.actor = {
      name: 'John Smith',
      birthday: thirty_eight.format('YYYY-MM-DDT00:00:00Z'),
    };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p.actor-age').innerText).toEqual('38 years old');
  });

  describe('makeGuess method', () => {
    let instance;

    beforeEach(() => {
      instance = fixture.componentInstance;
    });

    it('should add inputs to a list', () => {
      let guesses = instance.guesses.length;
      instance.makeGuess('hello world');
      expect(instance.guesses.length).toBe(guesses + 1);
    });

    it('should ignore empty inputs', () => {
      let guesses = instance.guesses.length;
      instance.makeGuess('');
      expect(instance.guesses.length).toBe(guesses);
    });

    it('should ignore duplicate inputs', () => {
      let guesses = instance.guesses.length;
      instance.makeGuess('hello world');
      instance.makeGuess('hello world');
      instance.makeGuess('Hello World');
      expect(instance.guesses.length).toBe(guesses + 1);
    });

    it('should show a movie if the title matches', () => {
      instance.actor.known_for = [{ title: 'Match' }, { title: 'Not' }];
      fixture.detectChanges();
      instance.makeGuess('Match');
      expect(instance.actor.known_for[0].shown).toBeTruthy();
      expect(instance.actor.known_for[1].shown).toBeFalsy();
    });

    it('should match titles case insensitively', () => {
      instance.actor.known_for = [{ title: 'Match' }, { title: 'another match' }];
      fixture.detectChanges();
      instance.makeGuess('match');
      instance.makeGuess('Another Match');
      expect(instance.actor.known_for[0].shown).toBeTruthy();
      expect(instance.actor.known_for[1].shown).toBeTruthy();
    });
  });

  describe('goToHomePage method', () => {
    it('should navigate to the home page', () => {
      fixture.componentInstance.goToAboutPage();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/about']);
    });
  });

  function getActorName(componentFixture: ComponentFixture<ActorComponent>): string {
    return componentFixture.nativeElement.querySelector('h2.actor-name').innerText;
  }
});
