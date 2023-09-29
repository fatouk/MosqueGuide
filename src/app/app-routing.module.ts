import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash-screem',
    pathMatch: 'full'
  },
  {
    path: 'splash-screem',
    loadChildren: () => import('./splash-screem/splash-screem.module').then( m => m.SplashScreemPageModule)
  },
  {
    path: 'inscrire',
    loadChildren: () => import('./inscrire/inscrire.module').then( m => m.InscrirePageModule)
  },
  {
    path: 'numerooublie',
    loadChildren: () => import('./numerooublie/numerooublie.module').then( m => m.NumerooubliePageModule)
  },
  {
    path: 'accueil',
    loadChildren: () => import('./accueil/accueil.module').then( m => m.AccueilPageModule)
  },
  {
    path: 'liste-mosquees',
    loadChildren: () => import('./liste-mosquees/liste-mosquees.module').then( m => m.ListeMosqueesPageModule)
  },
  {
    path: 'liste-sourates',
    loadChildren: () => import('./liste-sourates/liste-sourates.module').then( m => m.ListeSouratesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
