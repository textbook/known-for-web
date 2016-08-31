import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';

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

  it('should display the name of the movie', () => {
    let title = 'This Time It\'s Personal';
    fixture.componentInstance.movie = { title };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h3.movie-title').innerText).toEqual(title);
  });

  it('should display an image of the movie', () => {
    let imageUrl = 'poster.jpg';
    fixture.componentInstance.movie = { title: 'Watch This', image_url: imageUrl };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.movie-poster > img').src).toContain(imageUrl);
  });

  it('should display the movie\'s release year', () => {
    let releaseYear = 1234;
    fixture.componentInstance.movie = { title: 'Watch This', release_year: releaseYear };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p.movie-release').innerText).toContain(releaseYear);
  });
});
