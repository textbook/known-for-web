import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { SlimLoadingBarModule, SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { AboutComponent } from './about';
import { ActorComponent } from './actor';
import { AppComponent } from './app.component';
import { MovieComponent } from './movie/movie.component';

import { routes } from './app.router';

import { ActorAgePipe } from './pipes';
import { ActorService, MovieService } from './services';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    SlimLoadingBarModule.forRoot(),
  ],
  declarations: [ActorAgePipe, AppComponent, AboutComponent, ActorComponent, MovieComponent],
  bootstrap: [AppComponent],
  providers: [ActorService, MovieService, SlimLoadingBarService]
})
export class AppModule { }
