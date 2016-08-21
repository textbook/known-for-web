import { Component, OnInit } from '@angular/core';
import { Actor } from '../models';

@Component({
  moduleId: module.id,
  selector: 'kf-actor',
  templateUrl: 'actor.component.html',
  styleUrls: ['actor.component.css']
})
export class ActorComponent implements OnInit {

  actor: Actor;

  constructor() { }

  ngOnInit() { }

}
