import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VistaPrincipaleComponent } from './vista-principale/vista-principale.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'index', component: VistaPrincipaleComponent},
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
