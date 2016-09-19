import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from  'rxjs/Rx';

import { Actor, Movie } from '../models';
import { ActorService, MovieService } from '../services';

@Component({
  selector: 'kf-actor',
  templateUrl: 'actor.component.html',
  styleUrls: ['actor.component.scss'],
})
export class ActorComponent implements OnDestroy, OnInit {

  actor: Actor;
  _completed: boolean;
  guesses: string[];
  guessForm: FormGroup;
  sub: Subscription;
  suggestions: string[];
  title: FormControl;

  constructor(private actorService: ActorService,
              private movieService: MovieService,
              private router: Router,
              private builder: FormBuilder) {
    this.title = new FormControl('', Validators.required);
    this.guessForm = this.builder.group({ title: this.title });
    this.sub = this.title.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .filter(title => this.suggestionFilter(title))
        .flatMap(title => this.movieService.getMovieTitles(title))
        .subscribe(titles => this.suggestions = titles);
  }

  ngOnInit() {
    this.refreshActor();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get completed() {
    return this._completed;
  }

  set completed(value: boolean) {
    this.title[value ? 'disable' : 'enable']();
    this._completed = value;
  }

  suggestionFilter(title: string): boolean {
    if (title.length > 0) {
      return true;
    }
    this.suggestions = [];
    return false;
  }

  makeGuess(title?: string) {
    if (!title) {
      title = this.guessForm.controls['title'].value;
    }
    title = title.toLowerCase();
    if (title.length > 0 && this.guesses.indexOf(title) === -1) {
      if (this.actor && this.actor.known_for) {
        this.updateMovies(title);
      }
      this.guesses.push(title);
    }
    this.clearInput();
  }

  private updateMovies(title: string) {
    let allShown = true;
    this.actor.known_for.forEach((movie: Movie) => {
      if (movie.title.toLowerCase() === title) {
        movie.shown = true;
      } else if (!movie.shown) {
        allShown = false;
      }
    });
    this.completed = allShown;
  }

  refreshActor() {
    this.actorService.getActor().subscribe((actor: Actor) => {
      this.actor = actor;
      this.clearInput();
      this.completed = false;
      this.guesses = [];
    });
  }

  clearInput() {
    this.suggestions = [];
    this.title.setValue('');
  }

  goToAboutPage() {
    this.router.navigate(['/about']);
  }
}
