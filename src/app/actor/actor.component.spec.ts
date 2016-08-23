import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Rx';

import { ActorComponent } from './actor.component';
import { ActorService } from '../services/actor.service';

describe('Component: ActorComponent', () => {
  let fixture: ComponentFixture<ActorComponent>;
  let mockActorService: any;

  beforeEach(done => {
    mockActorService = jasmine.createSpyObj('ActorService', ['getActor']);
    mockActorService.getActor.and.returnValue(Observable.from([{ name: 'Hans Muster' }]));

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
    fixture.detectChanges();
    fixture.componentInstance.actor = { name: 'Hello World' };
    fixture.detectChanges();
    expect(getActorName(fixture)).toEqual('Hello World');
  });

  it('should show three related movies', () => {
    fixture.detectChanges();
    fixture.componentInstance.actor = { name: 'Hello World', known_for: [{}, {}, {}] };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('kf-movie').length).toEqual(3);
  });

  it('should retrieve an actor on init', () => {
    fixture.detectChanges();
    expect(mockActorService.getActor).toHaveBeenCalled();
    expect(getActorName(fixture)).toEqual('Hans Muster');
  });

  function getActorName(componentFixture: ComponentFixture<ActorComponent>): string {
    return componentFixture.nativeElement.querySelector('h2.actor-name').innerText;
  }
});
