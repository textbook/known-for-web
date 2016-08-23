import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Rx';

import { MovieComponent } from './movie.component';

describe('Component: Movie', () => {
  let fixture: ComponentFixture<MovieComponent>;
  let mockActorService: any;

  beforeEach(done => {
    mockActorService = jasmine.createSpyObj('ActorService', ['getActor']);
    mockActorService.getActor.and.returnValue(Observable.from([{ name: 'Hans Muster' }]));

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
    expect(fixture.nativeElement.querySelector('input.movie-title').value).toEqual(title);
  });

  it('should display an image of the movie', () => {
    let imageUrl = 'poster.jpg';
    fixture.componentInstance.movie = { title: 'Watch This', image_url: imageUrl };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img.movie-poster').src).toContain(imageUrl);
  });

  it('should display an image of the movie', () => {
    let releaseYear = 1234;
    fixture.componentInstance.movie = { title: 'Watch This', release_year: releaseYear };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p.movie-release').innerText).toContain(releaseYear);
  });
});
