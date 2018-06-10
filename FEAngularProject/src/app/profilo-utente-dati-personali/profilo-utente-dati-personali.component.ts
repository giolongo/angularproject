import { Component, OnInit } from '@angular/core';
import { User } from '../common/class/user';
import { EmployerLogService } from '../../service/employer-log.service';
@Component({
  selector: 'app-profilo-utente-dati-personali',
  templateUrl: './profilo-utente-dati-personali.component.html',
  styleUrls: ['./profilo-utente-dati-personali.component.css']
})
export class ProfiloUtenteDatiPersonaliComponent implements OnInit {
  //Campi per il form
  public nome : String;
  public cognome : String;
  public codiceFiscale : String;
  public dataDiNascita : Date;
  public email : String;
  public password : String;
  public iban : String;
  public banca : String;
  public bbc : String;
  public user : User;
  constructor(employerLogService:EmployerLogService) { 
    this.nome = employerLogService.getNomeUtente();
    this.cognome = employerLogService.getCognomeUtente();
    this.codiceFiscale = employerLogService.getCodiceFiscale();
    this.dataDiNascita = employerLogService.getDataDiNascita();
    this.email = employerLogService.getEmail();
    this.iban = employerLogService.getIban();
    this.banca = employerLogService.getBanca();
    this.bbc = employerLogService.getBbc();
  }

  ngOnInit() {
  }

}
