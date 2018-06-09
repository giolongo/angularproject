import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CalendarModule } from 'angular-calendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//Common
import { EmployerLogService } from '../service/employer-log.service';
import { LoginComponent } from './login/login.component';
import { RegistraUtenteComponent } from './registra-utente/registra-utente.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//Gestione dipendenti
import { RegistraTeamComponent } from './registra-team/registra-team.component';
import { VisualizzaSkillComponent } from './visualizza-skill/visualizza-skill.component';
import { VisualizzaTeamComponent } from './visualizza-team/visualizza-team.component';
import { ProfiloUtenteComponent } from './profilo-utente/profilo-utente.component';
import { ProfiloUtenteDatiPersonaliComponent } from './profilo-utente-dati-personali/profilo-utente-dati-personali.component';
import { ProfiloUtenteSkillsComponent } from './profilo-utente-skills/profilo-utente-skills.component';
//Gestione permessi
import { GestionePermessiComponent } from './gestione-permessi/gestione-permessi.component';
import { CalendarioPermessiDipendenteComponent } from './gestione-permessi/calendario-permessi-dipendente/calendario-permessi-dipendente.component';
import { GestionePermessiDipendentiComponent } from './gestione-permessi/gestione-permessi-dipendenti/gestione-permessi-dipendenti.component';
import { GestionePermessiManagerComponent } from './gestione-permessi/gestione-permessi-manager/gestione-permessi-manager.component';
import { DatatableListaPermessiManagerComponent } from './gestione-permessi/gestione-permessi-manager/datatable-lista-permessi-manager/datatable-lista-permessi-manager.component';
import { DatatableListaPermessiDipendentiComponent } from './gestione-permessi/gestione-permessi-dipendenti/datatable-lista-permessi-dipendenti/datatable-lista-permessi-dipendenti.component';
import { ModuloRichiestaPermessoDipendenteComponent } from './gestione-permessi/modulo-richiesta-permesso-dipendente/modulo-richiesta-permesso-dipendente.component';
//Gestione permessi - deprecati
import { RegistraPermessoComponent } from './gestione-permessi/registra-permesso/registra-permesso.component';
import { VisualizzaPermessiRichiestiComponent } from './gestione-permessi/visualizza-permessi-richiesti/visualizza-permessi-richiesti.component';
import { RegistraPermessiComponent } from './gestione-permessi/registra-permessi/registra-permessi.component';
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
    ModuloRichiestaPermessoDipendenteComponent,
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
