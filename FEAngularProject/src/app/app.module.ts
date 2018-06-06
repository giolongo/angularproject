import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EmployerLogService } from '../service/employer-log.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistraUtenteComponent } from './registra-utente/registra-utente.component';
import { RegistraTeamComponent } from './registra-team/registra-team.component';
import { RegistraPermessiComponent } from './registra-permessi/registra-permessi.component';
import { VisualizzaSkillComponent } from './visualizza-skill/visualizza-skill.component';
import { VisualizzaTeamComponent } from './visualizza-team/visualizza-team.component';
import { GestionePermessiComponent } from './gestione-permessi/gestione-permessi.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RegistraUtenteComponent,
    RegistraTeamComponent,
    RegistraPermessiComponent,
    VisualizzaSkillComponent,
    VisualizzaTeamComponent,
    GestionePermessiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [EmployerLogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
