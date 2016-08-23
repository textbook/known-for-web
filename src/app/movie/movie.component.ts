import { Component, Input } from '@angular/core';
import { Movie } from '../models';

@Component({
  moduleId: module.id,
  selector: 'kf-movie',
  templateUrl: 'movie.component.html',
  styleUrls: ['movie.component.css']
})
export class MovieComponent {

  @Input() movie: Movie;

  constructor() { }

}
