import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('App: KnownForWeb', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      done();
    });
  });

  it('should have as title \'Known For\'', () => {
    expect(fixture.componentInstance.title).toEqual('Known For');
  });
});
