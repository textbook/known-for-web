import { inject } from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/core/testing/test_component_builder';

import { ActorComponent } from './actor.component';

describe('Component: ActorComponent', () => {
  let tcb: TestComponentBuilder;

  beforeEach(done => {
    inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
      tcb = _tcb;
      done();
    })();
  });

  it('should show an actor\'s name', done => {
    tcb.createAsync(ActorComponent).then(fixture => {
      fixture.componentInstance.actor = { name: 'Hello World' };
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('h2.actor-name').innerText).toEqual('Hello World');
      done();
    });
  });

  it('should show three related movies', done => {
    tcb.createAsync(ActorComponent).then(fixture => {
      fixture.componentInstance.actor = { name: 'Hello World', movies: [{}, {}, {}] };
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('kf-movie').length).toEqual(3);
      done();
    });
  });
});
