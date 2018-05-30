import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';


const appRoutes: Routes = [
    //{ path: 'employerData', component: },
    //{ path: '', redirectTo: '/employerData', pathMatch: 'full'},
    //{ path: '**', component: PageNotFoundComponent }
];
  

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
