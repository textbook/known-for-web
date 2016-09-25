import { ElementRef, Renderer } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { SlimLoadingBarModule, SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs/Rx';

import { ActorComponent } from './actor.component';
import { MovieComponent } from '../movie/movie.component';

import { allShown, compareShown, showAll, showDefault } from '../models';
import { ActorAgePipe } from '../pipes';
import { ActorService, MovieService } from '../services';
import { Actor } from '../models/actor';
import { Shown } from '../models/shown';

describe('Component: Actor', () => {
  let fixture: ComponentFixture<ActorComponent>;
  let mockActorService: any;
  let mockRouter: any;
  let mockMovieService: any;
  let mockElementRef: any;
  let mockRenderer: any;

  beforeEach(done => {
    mockActorService = jasmine.createSpyObj('ActorService', ['getActor']);
    mockActorService.getActor.and.returnValue(Observable.from([{ name: 'Hans Muster' }]));

    mockMovieService = jasmine.createSpyObj('MovieService', ['getMovieTitles']);
    mockMovieService.getMovieTitles.and.returnValue(Observable.from([['foo', 'bar', 'baz']]));

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockElementRef = { nativeElement: jasmine.createSpyObj('NativeElement', ['querySelector']) };
    mockElementRef.nativeElement.querySelector.and.returnValue({});

    mockRenderer = jasmine.createSpyObj('Renderer', ['invokeElementMethod']);

    TestBed.configureTestingModule({
      declarations: [ActorAgePipe, ActorComponent, MovieComponent],
      imports: [ReactiveFormsModule, SlimLoadingBarModule],
      providers: [
        FormBuilder,
        SlimLoadingBarService,
        { provide: Renderer, useValue: mockRenderer },
        { provide: ElementRef, useValue: mockElementRef },
        { provide: ActorService, useValue: mockActorService },
        { provide: MovieService, useValue: mockMovieService },
        { provide: Router, useValue: mockRouter },
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ActorComponent);
      fixture.detectChanges();
      done();
    });
  });

  describe('basic information', () => {
    it('should show an actor\'s name', () => {
      fixture.componentInstance.actor = { name: 'Hello World' };
      fixture.detectChanges();
      expect(getActorName()).toEqual('Hello World');
    });

    it('should show three related movies', () => {
      fixture.componentInstance.actor = { name: 'Hello World', known_for: [{}, {}, {}] };
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('kf-movie').length).toEqual(3);
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
      fixture.componentInstance.actor = { name: 'John Smith', age: 38, alive: true };
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('p.actor-age').innerText).toEqual('38 years old');
    });

    it('should handle show a deceased actor\'s age at death', () => {
      fixture.componentInstance.actor = { name: 'John Smith', age: 38, alive: false };
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('p.actor-age').innerText).toEqual('Died aged 38');
    });
  });

  describe('movieTitle input', () => {
    let inputElement: HTMLInputElement;

    beforeEach(() => {
      inputElement = fixture.nativeElement.querySelector('input[name=movieTitle]');
    });

    it('should be filtered', done => {
      let spy = spyOn(fixture.componentInstance, 'suggestionFilter').and.returnValue(false);
      let title = 'foo';
      sendInput(title).then(() => {
        expect(spy).toHaveBeenCalledWith(title);
        done();
      });
    });

    it('should fetch suggestions when non-empty input is provided', done => {
      let title = 'hello';
      sendInput(title).then(() => {
        expect(mockMovieService.getMovieTitles).toHaveBeenCalledWith(title);
        done();
      });
    });

    it('should not fetch suggestions when empty input is provided', done => {
      sendInput('').then(() => {
        expect(mockMovieService.getMovieTitles).not.toHaveBeenCalled();
        done();
      });
    });

    it('should show suggestions', done => {
      sendInput('fight club').then(() => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.suggestion').length).toBe(3);
        done();
      });
    });

    it('should clear the suggestions when the input is removed', done => {
      sendInput('fight club').then(() => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.suggestion').length).toBe(3);

        sendInput('').then(() => {
          fixture.detectChanges();
          expect(fixture.nativeElement.querySelectorAll('.suggestion').length).toBe(0);
          done();
        });
      });
    });

    function sendInput(text: string) {
      inputElement.value = text;
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      return fixture.whenStable();
    }
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

  describe('provideHint method', () => {
    let allHints: Shown = { poster: false, releaseYear: true, synopsis: true, title: false };

    it('should be triggered by clicking the Hint button', () => {
      let spy = spyOn(fixture.componentInstance, 'provideHint');
      fixture.nativeElement.querySelector('#hintButton').click();
      expect(spy).toHaveBeenCalled();
    });

    it('should show an additional element of the first unrevealed movie', () => {
      let actor: Actor = {
        name: 'John Actor',
        known_for: [
          { title: 'Hello World', shown: showAll },
          { title: 'I am here too', shown: showDefault },
          { title: 'Also me', shown: showDefault },
        ],
      };
      fixture.componentInstance.actor = actor;
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#hintButton').click();
      fixture.detectChanges();
      expect(allShown(actor.known_for[0].shown)).toBeTruthy();
      expect(compareShown(
        actor.known_for[1].shown,
        { poster: false, title: false, synopsis: false, releaseYear: true }
      )).toBeTruthy();
      expect(compareShown(actor.known_for[2].shown, showDefault)).toBeTruthy();
    });

    it('should pass over movies with both hints revealed', () => {
      let actor: Actor = {
        name: 'John Actor',
        known_for: [
          { title: 'Hello World', shown: showAll },
          { title: 'I am here too', shown: allHints },
          { title: 'Also me', shown: showDefault },
        ],
      };
      fixture.componentInstance.actor = actor;
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#hintButton').click();
      fixture.detectChanges();
      expect(allShown(actor.known_for[0].shown)).toBeTruthy();
      expect(compareShown(actor.known_for[1].shown, allHints)).toBeTruthy();
      expect(compareShown(
        actor.known_for[2].shown,
          { poster: false, releaseYear: true, synopsis: false, title: false }
      )).toBeTruthy();
    });
  });

  describe('makeGuess method', () => {
    let instance;

    beforeEach(() => {
      instance = fixture.componentInstance;
    });

    it('should be triggered by clicking the Guess button', () => {
      let spy = spyOn(instance, 'makeGuess');
      fixture.nativeElement.querySelector('#guessButton').click();
      expect(spy).toHaveBeenCalled();
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
      instance.actor.known_for = [
        { title: 'Match', shown: showDefault },
        { title: 'Not', shown: showDefault },
      ];
      fixture.detectChanges();
      instance.makeGuess('Match');
      expect(allShown(instance.actor.known_for[0].shown)).toBeTruthy();
      expect(allShown(instance.actor.known_for[1].shown)).toBeFalsy();
    });

    it('should match titles case insensitively', () => {
      instance.actor.known_for = [
        { title: 'Match', shown: showDefault },
        { title: 'another match', shown: showDefault },
      ];
      fixture.detectChanges();
      instance.makeGuess('match');
      instance.makeGuess('Another Match');
      expect(allShown(instance.actor.known_for[0].shown)).toBeTruthy();
      expect(allShown(instance.actor.known_for[1].shown)).toBeTruthy();
    });

    it('should clear the suggested titles', () => {
      instance.suggestions = ['hello', 'world'];
      fixture.detectChanges();
      instance.makeGuess('something');
      fixture.detectChanges();
      expect(instance.suggestions.length).toBe(0);
    });

    describe('when last movie guessed', () => {
      let title = 'the last one';

      beforeEach(() => {
        fixture.componentInstance.actor.known_for = [
          { shown: showAll, title: 'first' },
          { shown: showAll, title: 'second' },
          { shown: showDefault, title },
        ];
        fixture.detectChanges();
      });

      it('should disable the guess inputs', () => {
        fixture.componentInstance.makeGuess(title);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[name=movieTitle]').disabled).toBeTruthy();
        expect(fixture.nativeElement.querySelector('#guessButton').disabled).toBeTruthy();
      });

      it('should change the Skip button to Next', () => {
        fixture.componentInstance.makeGuess(title);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#skipButton').innerText).toBe('Next');
      });
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

    it('should invoke the progress bar', () => {
      spyOn(fixture.componentInstance.loadingBar, 'start');
      spyOn(fixture.componentInstance.loadingBar, 'complete');

      fixture.componentInstance.refreshActor();
      fixture.detectChanges();

      expect(fixture.componentInstance.loadingBar.start).toHaveBeenCalled();
      expect(fixture.componentInstance.loadingBar.complete).toHaveBeenCalled();
    });
  });

  describe('goToAboutPage method', () => {
    it('should navigate to the about page', () => {
      fixture.componentInstance.goToAboutPage();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/about']);
    });
  });

  describe('onMovieClicked method', () => {
    it('should be triggered by clicking on a movie', () => {
      let spy = spyOn(fixture.componentInstance, 'onMovieClicked');
      fixture.componentInstance.actor.known_for = [{ title: 'movie title' }];
      fixture.detectChanges();

      fixture.nativeElement.querySelector('kf-movie').click();

      expect(spy).toHaveBeenCalled();
    });

    it('should focus the input', () => {
      let spy = spyOn(fixture.nativeElement.querySelector('input[name=movieTitle]'), 'focus');

      fixture.componentInstance.onMovieClicked();

      expect(spy).toHaveBeenCalled();
    });
  });

  function getActorName(): string {
    return fixture.nativeElement.querySelector('h2.actor-name').innerText;
  }
});
