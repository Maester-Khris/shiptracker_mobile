import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shippings/home',
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
    path: 'shippings/list',
    loadChildren: () => import('./pages/shippings/list/list.module').then( m => m.ListPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'shippings/details',
    loadChildren: () => import('./pages/shippings/details/details.module').then( m => m.DetailsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'shippings/add-one',
    loadChildren: () => import('./pages/shippings/add-one/add-one.module').then( m => m.AddOnePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'shipping/update/scan',
    loadChildren: () => import('./pages/shippingsUpdate/scan/scan.module').then( m => m.ScanPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'shipping/update/operation',
    loadChildren: () => import('./pages/shippingsUpdate/operation/operation.module').then( m => m.OperationPageModule)
  },
  {
    path: 'shipping/update/modifiy-one',
    loadChildren: () => import('./pages/shippingsUpdate/update-type/update-type.module').then( m => m.UpdateTypePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'parametre',
    loadChildren: () => import('./pages/parametre/parametre.module').then( m => m.ParametrePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'statistics',
    loadChildren: () => import('./pages/statistics/statistics.module').then( m => m.StatisticsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
