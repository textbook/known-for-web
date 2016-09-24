import { Pipe, PipeTransform } from '@angular/core';

import { Actor } from '../models';

@Pipe({
  name: 'actorAge'
})
export class ActorAgePipe implements PipeTransform {

  transform(actor: Actor): any {
    if (actor) {
      if (actor.age) {
        if (!actor.hasOwnProperty('alive') || actor.alive) {
          return `${actor.age} years old`;
        }
        return `Died aged ${actor.age}`;
      }
    }
    return 'Age unknown';
  }

}
