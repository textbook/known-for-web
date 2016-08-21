import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ActorComponent } from './actor';
import { ActorService } from './services/actor.service';

@NgModule({
  imports: [BrowserModule, HttpModule],
  declarations: [AppComponent, ActorComponent],
  bootstrap: [AppComponent],
  providers: [ActorService]
})
export class AppModule { }
