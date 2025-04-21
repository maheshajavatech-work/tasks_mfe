import { Routes } from '@angular/router';
import { FeatureHomeComponent } from './feature-home.component';

// 1) keep a private routes array
const _routes: Routes = [
  {
    path: '',
    component: FeatureHomeComponent
  }
];

/**
 * 2) expose it as a function (avoids TDZ issues)
 */
export function getRoutes(): Routes {
  return _routes;
}

/**
 * 3) ALSO export it as a plain const
 *    so legacy callers (m.routes) still work
 */
export const routes = _routes;
