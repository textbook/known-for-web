import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorComponent } from './actor.component';

describe('Component: ActorComponent', () => {
  let fixture: ComponentFixture<ActorComponent>;

  beforeEach(done => {

    TestBed.configureTestingModule({
      declarations: [ActorComponent],
      providers: [
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ActorComponent);
      done();
    });
  });

  it('should show an actor\'s name', () => {
    fixture.componentInstance.actor = { name: 'Hello World' };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2.actor-name').innerText).toEqual('Hello World');
  });

  it('should show three related movies', () => {
    fixture.componentInstance.actor = { name: 'Hello World', movies: [{}, {}, {}] };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('kf-movie').length).toEqual(3);
  });
});
