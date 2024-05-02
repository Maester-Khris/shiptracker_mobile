import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./pages/shippings/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'shippings/scan',
    loadChildren: () => import('./pages/shippings/scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'shippings/details',
    loadChildren: () => import('./pages/shippings/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'parametre',
    loadChildren: () => import('./pages/parametre/parametre.module').then( m => m.ParametrePageModule)
  }
];


// {
//   path: '',
//   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
// },


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
