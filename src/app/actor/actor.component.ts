import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Actor, Movie } from '../models';
import { ActorService, MovieService } from '../services';

@Component({
  selector: 'kf-actor',
  templateUrl: 'actor.component.html',
  styleUrls: ['actor.component.scss'],
})
export class ActorComponent implements OnInit {

  actor: Actor;
  guesses: string[];
  suggestions: string[];

  constructor(
    private actorService: ActorService,
    private movieService: MovieService,
    private router: Router) { }

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
    this.suggestions = [];
  }

  suggestTitles(title: string) {
    title = title.toLowerCase();
    this.movieService.getMovieTitles(title).subscribe((titles: string[]) => {
      this.suggestions = titles;
    });
  }

  private updateMovies(title: string) {
    this.actor.known_for.forEach((movie: Movie) => {
      if (movie.title.toLowerCase() === title) {
        movie.shown = true;
      }
    });
  }

  refreshActor() {
    this.actorService.getActor().subscribe((actor: Actor) => {
      this.actor = actor;
      this.guesses = [];
    });
  }

  goToAboutPage() {
    this.router.navigate(['/about']);
  }
}
