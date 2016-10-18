import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GameModule } from './game/game.module';

@NgModule({
  imports: [AppRoutingModule, BrowserModule, GameModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
