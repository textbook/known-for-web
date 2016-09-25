import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { compareShown, Movie, showAll, showDefault } from '../models';

describe('Component: Movie', () => {
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({ declarations: [MovieComponent] });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(MovieComponent);
      fixture.detectChanges();
      done();
    });
  });

  describe('shown getter', () => {
    let instance;

    beforeEach(() => {
      instance = fixture.componentInstance;
    });

    it('should return default when there is no movie', () => {
      expect(compareShown(instance.shown, showDefault)).toBeTruthy();
    });

    it('should return default when the movie has no shown property', () => {
      fixture.componentInstance.movie = <Movie>{ title: 'Some Movie' };
      expect(compareShown(instance.shown, showDefault)).toBeTruthy();
    });

    it('should return movie shown property when present', () => {
      fixture.componentInstance.movie = <Movie>{ shown: showAll, title: 'Some Movie' };
      expect(compareShown(instance.shown, showAll)).toBeTruthy();
    });
  });

  describe('when shown', () => {
    let movie: Movie;

    beforeEach(() => {
      movie = {
        title: 'Watch This',
        image_url: 'poster.jpg',
        release_year: 2001,
        synopsis: 'The movie Watch This does not exist',
        shown: showAll,
      };
      fixture.componentInstance.movie = movie;
      fixture.detectChanges();
    });

    it('should display the name of the movie', () => {
      expect(fixture.nativeElement.querySelector('h3.movie-title').innerText).toEqual(movie.title);
    });

    it('should display an image of the movie', () => {
      expect(fixture.nativeElement.querySelector('.movie-poster > img.blurred')).toBeNull();
      expect(fixture.nativeElement.querySelector('.movie-poster > img').src).toContain(movie.image_url);
    });

    it('should display the movie\'s release year', () => {
      expect(fixture.nativeElement.querySelector('p.movie-release').innerText).toContain(movie.release_year);
    });
  });

  describe('when not shown', () => {
    let movie: Movie;

    beforeEach(() => {
      movie = {
        title: 'Watch This',
        image_url: 'poster.jpg',
        release_year: 2001,
        shown: showDefault,
      };
      fixture.componentInstance.movie = movie;
      fixture.detectChanges();
    });

    it('should not display the name of the movie', () => {
      expect(fixture.nativeElement.querySelector('h3.movie-title').innerText).toEqual('\xa0');
    });

    it('should display a blurred image of the movie', () => {
      expect(fixture.nativeElement.querySelector('.movie-poster > img.blurred')).not.toBeNull();
    });

    it('should display the movie\'s release year', () => {
      expect(fixture.nativeElement.querySelector('p.movie-release').innerText).toContain(movie.release_year);
    });
  });
});
