import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';

import { ActorComponent } from './actor.component';
import { ActorService } from '../services/actor.service';

describe('Component: ActorComponent', () => {
  let fixture: ComponentFixture<ActorComponent>;
  let mockActorService: any;

  beforeEach(done => {
    mockActorService = jasmine.createSpyObj('ActorService', ['getActor']);
    // mockActorService.getActor.and.returnValue(Observable.from([{ name: '' }]));

    TestBed.configureTestingModule({
      declarations: [ActorComponent],
      providers: [
        { provide: ActorService, useValue: mockActorService }
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
