import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'shippings/home',
    loadChildren: () => import('./pages/shippings/home/home.module').then( m => m.HomePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'shippings/scan',
    loadChildren: () => import('./pages/shippings/scan/scan.module').then( m => m.ScanPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'shippings/details',
    loadChildren: () => import('./pages/shippings/details/details.module').then( m => m.DetailsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'parametre',
    loadChildren: () => import('./pages/parametre/parametre.module').then( m => m.ParametrePageModule),
    canActivate: [authGuard]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
