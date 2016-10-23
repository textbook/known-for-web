import { Component, Input } from '@angular/core';

import { Movie, showDefault, Shown } from '../../models';

@Component({
  selector: 'kf-movie',
  templateUrl: 'movie.component.html',
  styleUrls: ['movie.component.scss']
})
export class MovieComponent {

  @Input() movie: Movie;

  constructor() { }

  get shown(): Shown {
    if (this.movie && this.movie.shown) {
      return this.movie.shown;
    }
    return showDefault;
  }
}
