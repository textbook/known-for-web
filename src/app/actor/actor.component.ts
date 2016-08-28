import { Component, OnInit } from '@angular/core';

import { Actor } from '../models';
import { ActorService } from '../services';
import { MovieComponent } from '../movie/movie.component';
import { AgePipe } from '../pipes';

@Component({
  moduleId: module.id,
  selector: 'kf-actor',
  templateUrl: 'actor.component.html',
  styleUrls: ['actor.component.css'],
  directives: [MovieComponent],
  pipes: [AgePipe]
})
export class ActorComponent implements OnInit {

  actor: Actor;

  constructor(private actorService: ActorService) { }

  ngOnInit() {
    this.refreshActor();
  }

  refreshActor() {
    this.actorService.getActor().subscribe(actor => this.actor = actor);
  }
}
