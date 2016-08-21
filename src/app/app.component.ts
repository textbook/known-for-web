import { Component } from '@angular/core';
import { ActorComponent } from './actor';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ActorComponent]
})
export class AppComponent {
  title = 'Known For';
}
