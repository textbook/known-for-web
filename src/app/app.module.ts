import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about';
import { ActorComponent } from './actor';
import { AppComponent }  from './app.component';
import { MovieComponent } from './movie/movie.component';

import { routes } from './app.router';

import { ActorService, MovieService } from './services';

@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes)],
  declarations: [AppComponent, AboutComponent, ActorComponent, MovieComponent],
  bootstrap: [AppComponent],
  providers: [ActorService, MovieService]
})
export class AppModule { }
