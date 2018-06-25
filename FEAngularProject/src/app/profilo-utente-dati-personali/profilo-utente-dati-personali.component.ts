import { Component, OnInit } from '@angular/core';
import { User } from '../common/class/user';
import { EmployerLogService } from '../../service/employer-log.service';
import { RestRequestService } from '../../service/rest-request.service';
import { Router } from "@angular/router";
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
  isLoading: boolean = false;
  buttonIsVisible : boolean;
  constructor(private employerLogService:EmployerLogService, private restRequestService:RestRequestService, private router:Router) { 
    this.nome = employerLogService.getNomeUtente();
    this.cognome = employerLogService.getCognomeUtente();
    this.codiceFiscale = employerLogService.getCodiceFiscale();
    var data = employerLogService.getDataDiNascita().date;
    this.dataDiNascita = employerLogService.getDataDiNascita();
    this.email = employerLogService.getEmail();
    this.iban = employerLogService.getIban();
    this.banca = employerLogService.getBanca();
    this.bbc = employerLogService.getBbc();
  }

  ngOnInit() {
  }

  aggiornaDipendente(){
    this.isLoading = true;
    console.log(this.dataDiNascita);
    var parameters = {
      'token' : sessionStorage.getItem("token"),
      'nome': this.nome,
      'cognome': this.cognome,
      'dataDiNascita':this.dataDiNascita,
      'email':this.email,
      'iban':this.iban,
      'banca':this.banca,
      'bbc':this.bbc,
      'password':this.password
    }

    this.restRequestService.updateUtente(parameters).subscribe(function(){
      this.employerLogService.refreshSessionByTokenRequest().subscribe(function(response){
        if(!this.employerLogService.caricaUtenteLoggato(response)){
          this.router.navigate(['/login']);
        }
        this.isLoading = false;
      }.bind(this));
    }.bind(this)); 
  }

  isDisabled() {
    if(!this.nome || !this.cognome || !this.dataDiNascita || !this.email || !this.password){
      return true;
    }else{
      return false;
    }
  }

}
