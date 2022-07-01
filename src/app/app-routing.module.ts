import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Tab1Page } from './tab1/tab1.page';


export const routes: Routes = [
  // {
  //   path: 'myprevious',
  //   loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  // },
  // {
  //   path: '',
  //   redirectTo: 'myprevious',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'previousTommorow',
  //   loadChildren: () => import('./tab2/tab2.module').then( m =>{ 
  //     console.log(m)
  //     m.Tab2PageModule})
  // },
  // {
  //   path: 'previousDay',
  //   loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  // }
  
      {
        path: 'tab1',
        loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule),
        pathMatch: 'full'
      },
      {
        path: 'tab2',
        loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule),
        pathMatch: 'full'
      },
      {
        path: 'tab3',
        loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule),
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: '/tab1',
        pathMatch: 'full'
      }
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
