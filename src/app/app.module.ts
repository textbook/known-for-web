import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { ActorComponent } from './actor';
import { AppComponent }  from './app.component';
import { MovieComponent } from './movie/movie.component';

import { AgePipe } from './pipes/age.pipe';

import { ActorService } from './services/actor.service';

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [AppComponent, ActorComponent, MovieComponent, AgePipe],
  bootstrap: [AppComponent],
  providers: [ActorService]
})
export class AppModule { }
