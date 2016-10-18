import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ActorComponent } from './actor/actor.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ActorComponent }
  ])],
  exports: [RouterModule]
})
export class GameRoutingModule { }
