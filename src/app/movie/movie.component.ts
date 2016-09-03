import { Component, Input } from '@angular/core';
import { Movie } from '../models';

@Component({
  selector: 'kf-movie',
  templateUrl: 'movie.component.html',
  styleUrls: ['movie.component.scss']
})
export class MovieComponent {

  @Input() movie: Movie;

  constructor() { }

}
