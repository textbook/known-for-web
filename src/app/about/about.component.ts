import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'kf-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(private router: Router) { }

  goToHomePage() {
    this.router.navigate(['']);
  }
}
