import { TestBed, ComponentFixture } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('Component: About', () => {
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({ declarations: [AboutComponent] });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(AboutComponent);
      fixture.detectChanges();
      done();
    });
  });

  it('should display information about the app', () => {
    let byline = 'developed by Jonathan Sharpe';
    expect(fixture.nativeElement.querySelector('p.intro').innerText).toContain(byline);
  });
});
