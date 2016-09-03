import { Routes } from '@angular/router';

import { AboutComponent } from './about';
import { ActorComponent } from './actor';

export const routes: Routes = [
  { path: '', component: ActorComponent },
  { path: 'about', component: AboutComponent },
];
