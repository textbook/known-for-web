import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { Movie } from '../models';

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

  describe('when clicked', () => {
    let instance: MovieComponent;

    beforeEach(() => {
      instance = fixture.componentInstance;
    });

    it('should emit a "movieClicked" event', () => {
      let spy = spyOn(instance.movieClicked, 'emit');
      let title = 'hello world';
      fixture.componentInstance.movie = { title };
      fixture.detectChanges();

      fixture.nativeElement.querySelector('.movie-details').click();

      expect(spy).toHaveBeenCalledWith(title);
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
        shown: true,
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
        shown: false,
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
