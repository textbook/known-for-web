import { Component, OnInit } from '@angular/core';

import { Actor, Movie } from '../models';
import { ActorService } from '../services';

@Component({
  selector: 'kf-actor',
  templateUrl: 'actor.component.html',
  styleUrls: ['actor.component.scss'],
})
export class ActorComponent implements OnInit {

  actor: Actor;
  guesses: string[];

  constructor(private actorService: ActorService) { }

  ngOnInit() {
    this.refreshActor();
  }

  makeGuess(title: string) {
    title = title.toLowerCase();
    if (title.length > 0 && this.guesses.indexOf(title) === -1) {
      if (this.actor && this.actor.known_for) {
        this.updateMovies(title);
      }
      this.guesses.push(title);
    }
  }

  private updateMovies(title: string) {
    this.actor.known_for.forEach((movie: Movie) => {
      if (movie.title.toLowerCase() === title) {
        movie.shown = true;
      }
    });
  }

  refreshActor() {
    this.actorService.getActor().subscribe(actor => {
      this.actor = actor;
      this.guesses = [];
    });
  }
}
