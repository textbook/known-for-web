import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SlimLoadingBarModule, SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { GameRoutingModule } from './game-routing.module';

import { ActorAgePipe } from './actor/actor-age.pipe';
import { ActorComponent } from './actor/actor.component';
import { GameService } from './game.service';
import { MovieComponent } from './actor/movie/movie.component';

@NgModule({
  declarations: [ActorAgePipe, ActorComponent, MovieComponent],
  exports: [ActorComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    SlimLoadingBarModule.forRoot(),
  ],
  providers: [GameService, SlimLoadingBarService],
})
export class GameModule { }
