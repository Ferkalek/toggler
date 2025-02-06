import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthComponent } from './pages/auth/auth.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Головна сторінка'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Особистий кабінет',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthComponent,
    title: 'Авторизація'
  },
  {
    path: '404',
    component: NotFoundComponent,
    title: 'Сторінку не знайдено'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
