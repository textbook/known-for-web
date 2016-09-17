import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { ActorComponent } from './actor.component';
import { MovieComponent } from '../movie/movie.component';

import { ActorService, MovieService } from '../services';

describe('Component: Actor', () => {
  let fixture: ComponentFixture<ActorComponent>;
  let mockActorService: any;
  let mockRouter: any;
  let mockMovieService: any;

  beforeEach(done => {
    mockActorService = jasmine.createSpyObj('ActorService', ['getActor']);
    mockActorService.getActor.and.returnValue(Observable.from([{ name: 'Hans Muster' }]));

    mockMovieService = jasmine.createSpyObj('MovieService', ['getMovieTitles']);
    mockMovieService.getMovieTitles.and.returnValue(Observable.from([[ 'foo', 'bar', 'baz' ]]));

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ActorComponent, MovieComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ActorService, useValue: mockActorService },
        { provide: MovieService, useValue: mockMovieService },
        { provide: Router, useValue: mockRouter },
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
    expect(getActorName()).toEqual('Hello World');
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
    expect(getActorName()).toEqual('Hans Muster');
  });

  it('should show the actor\'s age', () => {
    fixture.componentInstance.actor = { name: 'John Smith', age: 38 };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p.actor-age').innerText).toEqual('38 years old');
  });

  describe('suggestionFilter method', () => {
    let instance;

    beforeEach(() => {
      instance = fixture.componentInstance;
      instance.suggestions = ['foo', 'bar', 'baz'];
      fixture.detectChanges();
    });

    it('should return true for non-empty strings', () => {
      expect(instance.suggestionFilter('hello')).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('.suggestion').length).toBe(3);
    });

    it('should return false and clear suggestions for empty strings', () => {
      expect(instance.suggestionFilter('')).toBeFalsy();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('.suggestion').length).toBe(0);
    });
  });

  describe('makeGuess method', () => {
    let instance;

    beforeEach(() => {
      instance = fixture.componentInstance;
    });

    it('should use the input value if none provided', () => {
      let title = 'a movie title';
      instance.guessForm.controls['title'].setValue(title);
      instance.makeGuess();
      expect(instance.guesses.pop()).toBe(title);
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

    it('should clear the suggested titles', () => {
      instance.suggestions = ['hello', 'world'];
      fixture.detectChanges();
      instance.makeGuess('something');
      fixture.detectChanges();
      expect(instance.suggestions.length).toBe(0);
    });
  });

  describe('refreshActor method', () => {
    it('should call the actor service', () => {
      fixture.componentInstance.refreshActor();

      expect(mockActorService.getActor).toHaveBeenCalled();
    });

    it('should clear the guesses', () => {
      fixture.componentInstance.guesses = ['foo', 'bar', 'baz'];
      fixture.detectChanges();

      fixture.componentInstance.refreshActor();

      fixture.detectChanges();
      expect(fixture.componentInstance.guesses.length).toBe(0);
      expect(fixture.nativeElement.querySelectorAll('li.guess').length).toBe(0);
    });
  });

  describe('goToAboutPage method', () => {
    it('should navigate to the about page', () => {
      fixture.componentInstance.goToAboutPage();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/about']);
    });
  });

  function getActorName(): string {
    return fixture.nativeElement.querySelector('h2.actor-name').innerText;
  }
});
