import { Component, OnInit } from '@angular/core';

import { Actor } from '../models';
import { ActorService } from '../services/actor.service';

@Component({
  moduleId: module.id,
  selector: 'kf-actor',
  templateUrl: 'actor.component.html',
  styleUrls: ['actor.component.css']
})
export class ActorComponent implements OnInit {

  actor: Actor;

  constructor(private actorService: ActorService) { }

  ngOnInit() {
    this.actorService.getActor().subscribe(actor => this.actor = actor);
  }
}
