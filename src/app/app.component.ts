import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kf-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Known For';
}
