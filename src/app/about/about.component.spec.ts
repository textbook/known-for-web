import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AboutComponent } from './about.component';

describe('Component: About', () => {
  let fixture: ComponentFixture<AboutComponent>;
  let mockRouter: any;

  beforeEach(done => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [AboutComponent],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(AboutComponent);
      fixture.detectChanges();
      done();
    });
  });

  it('should display information about the app', () => {
    const byline = 'developed by Jonathan Sharpe';
    expect(fixture.nativeElement.querySelector('p.intro').innerText).toContain(byline);
  });

  describe('goToHomePage method', () => {
    it('should navigate to the home page', () => {
      fixture.componentInstance.goToHomePage();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
    });
  });
});
