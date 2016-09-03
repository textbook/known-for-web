import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about';
import { ActorComponent } from './actor';
import { AppComponent }  from './app.component';
import { MovieComponent } from './movie/movie.component';

import { AgePipe } from './pipes/age.pipe';

import { routes } from './app.router';

import { ActorService } from './services/actor.service';

@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes)],
  declarations: [
    AppComponent,
    AboutComponent, ActorComponent, MovieComponent,
    AgePipe
  ],
  bootstrap: [AppComponent],
  providers: [ActorService]
})
export class AppModule { }
