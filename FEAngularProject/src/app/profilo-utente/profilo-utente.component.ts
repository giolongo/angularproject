import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../service/employer-log.service';
import { RestRequestService } from '../../service/rest-request.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profilo-utente',
  templateUrl: './profilo-utente.component.html',
  styleUrls: ['./profilo-utente.component.css']
})
export class ProfiloUtenteComponent implements OnInit {
  public nome : String;
  public cognome : String;
  public codiceFiscale : String;
  public dataDiNascita : Date;
  public email : String;
  public password : String;
  public skills : any;
  constructor(private employerLogService : EmployerLogService, private router: Router, private restRequestService:RestRequestService) { 
    this.nome = employerLogService.getNomeUtente();
    this.cognome = employerLogService.getCognomeUtente();
    this.codiceFiscale =  employerLogService.getCodiceFiscale();
    this.dataDiNascita = employerLogService.getDataDiNascita();
    this.email = employerLogService.getEmail();
  }

  ngOnInit() {
    if(!this.employerLogService.isLogged()){
      //Se non lo è lo riporto alla pagina di Login
      if(!sessionStorage.getItem("token")){
        this.router.navigate(['/login']);
      }else{
        this.employerLogService.refreshSessionByTokenRequest().subscribe(function(response){
          if(!this.employerLogService.caricaUtenteLoggato(response)){
            this.router.navigate(['/login']);
          }
        }.bind(this));
      }
    }

    this.restRequestService.getSkills().subscribe(function(response){
      this.skills = response['data'];
      console.log(this.skills);
    }.bind(this));
  }



  public aggiornaDipendente(){
    console.log("Nuovi dati: ");
    console.log(this.nome);
    console.log(this.cognome);
    console.log(this.dataDiNascita);
    console.log(this.email);
    console.log(this.password);
  }



}
