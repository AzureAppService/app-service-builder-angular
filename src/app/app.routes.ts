import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { NotFound } from './pages/not-found';
import { Product } from './pages/product';

export const routes: Routes = [
  { path: '', component: Home, title: 'App Service Builder: Angular sample' },
  {
    path: 'products/widget-1',
    component: Product,
    title: 'Widget 1 | App Service Builder: Angular',
  },
  { path: '**', component: NotFound, title: 'Page not found | App Service Builder: Angular' },
];
