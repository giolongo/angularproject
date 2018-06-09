import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistraUtenteComponent } from './registra-utente/registra-utente.component';
import { RegistraTeamComponent } from './registra-team/registra-team.component';
import { RegistraPermessiComponent } from './gestione-permessi/registra-permessi/registra-permessi.component';
import { VisualizzaSkillComponent } from './visualizza-skill/visualizza-skill.component';
import { VisualizzaTeamComponent } from './visualizza-team/visualizza-team.component';
import { ProfiloUtenteComponent } from './profilo-utente/profilo-utente.component';
import { GestionePermessiComponent } from './gestione-permessi/gestione-permessi.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'login', component: LoginComponent, pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
    { path: 'registraUtente', component: RegistraUtenteComponent, pathMatch: 'full'},
    { path: 'registraTeam', component: RegistraTeamComponent, pathMatch: 'full'},
    { path: 'registraPermessi', component: RegistraPermessiComponent, pathMatch: 'full'},
    { path: 'visualizzaSkills', component: VisualizzaSkillComponent, pathMatch: 'full'},
    { path: 'visualizzaTeam', component: VisualizzaTeamComponent, pathMatch: 'full'},
    { path: 'visualizzaProfilo', component: ProfiloUtenteComponent, pathMatch: 'full'},
    { path: 'gestionePermessiDipendente', component: GestionePermessiComponent, pathMatch: 'full'},
    
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
