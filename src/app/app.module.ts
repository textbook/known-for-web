import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ActorComponent } from './actor';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, ActorComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
