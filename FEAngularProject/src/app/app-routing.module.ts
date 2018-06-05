import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VistaPrincipaleComponent } from './vista-principale/vista-principale.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full'},
    { path: 'register', component: RegisterComponent, pathMatch: 'full'},
    { path: 'index', component: VistaPrincipaleComponent, pathMatch: 'full'},
    { path: '', redirectTo: '/index', pathMatch: 'full'},
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
