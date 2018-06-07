import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EmployerLogService } from '../service/employer-log.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistraUtenteComponent } from './registra-utente/registra-utente.component';
import { RegistraTeamComponent } from './registra-team/registra-team.component';
import { RegistraPermessiComponent } from './registra-permessi/registra-permessi.component';
import { VisualizzaSkillComponent } from './visualizza-skill/visualizza-skill.component';
import { VisualizzaTeamComponent } from './visualizza-team/visualizza-team.component';
import { GestionePermessiComponent } from './gestione-permessi/gestione-permessi.component';
import { ProfiloUtenteComponent } from './profilo-utente/profilo-utente.component';
import { RegistraPermessoComponent } from './registra-permesso/registra-permesso.component';
import { VisualizzaPermessiRichiestiComponent } from './visualizza-permessi-richiesti/visualizza-permessi-richiesti.component';
import { GestionePermessiDipendentiComponent } from './gestione-permessi-dipendenti/gestione-permessi-dipendenti.component';
import { GestionePermessiManagerComponent } from './gestione-permessi-manager/gestione-permessi-manager.component';
import { DatatableListaPermessiManagerComponent } from './datatable-lista-permessi-manager/datatable-lista-permessi-manager.component';
import { DatatableListaPermessiDipendentiComponent } from './datatable-lista-permessi-dipendenti/datatable-lista-permessi-dipendenti.component';
import { DataTablesModule } from 'angular-datatables';
import { CalendarioPermessiDipendenteComponent } from './calendario-permessi-dipendente/calendario-permessi-dipendente.component';
import { CalendarModule } from 'angular-calendar';
import { ProfiloUtenteDatiPersonaliComponent } from './profilo-utente-dati-personali/profilo-utente-dati-personali.component';
import { ProfiloUtenteSkillsComponent } from './profilo-utente-skills/profilo-utente-skills.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistraUtenteComponent,
    RegistraTeamComponent,
    RegistraPermessiComponent,
    VisualizzaSkillComponent,
    VisualizzaTeamComponent,
    GestionePermessiComponent,
    ProfiloUtenteComponent,
    RegistraPermessoComponent,
    VisualizzaPermessiRichiestiComponent,
    GestionePermessiDipendentiComponent,
    GestionePermessiManagerComponent,
    DatatableListaPermessiManagerComponent,
    DatatableListaPermessiDipendentiComponent,
    CalendarioPermessiDipendenteComponent,
    ProfiloUtenteDatiPersonaliComponent,
    ProfiloUtenteSkillsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot()
  ],
  providers: [EmployerLogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
