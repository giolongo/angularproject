import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../service/employer-log.service';
import { RestRequestService } from '../../service/rest-request.service';
import { SkillsService } from '../../service/skills.service';
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
  constructor(private employerLogService : EmployerLogService, private router: Router, 
    private restRequestService:RestRequestService, private skillsService:SkillsService) { 
      if(this.employerLogService.isLogged()){
        this.initUtente();
      }
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
          this.initUtente();
        }.bind(this));
      }
    }

    this.restRequestService.getSkills().subscribe(function(response){
      this.skills = response['data'];
    }.bind(this));

    if(!this.skillsService.getSkills()){
      this.skillsService.richiediSkills().subscribe(function(response){
        this.skillsService.caricaSkills(response);
        console.log(this.skillsService.getSkills());
     }.bind(this));
    }
}



  public aggiornaDipendente(){
    console.log("Nuovi dati: ");
    console.log(this.nome);
    console.log(this.cognome);
    console.log(this.dataDiNascita);
    console.log(this.email);
    console.log(this.password);
  }

  initUtente(){
    this.nome = this.employerLogService.getNomeUtente();
    this.cognome = this.employerLogService.getCognomeUtente();
    this.codiceFiscale =  this.employerLogService.getCodiceFiscale();
    this.dataDiNascita = this.employerLogService.getDataDiNascita();
    this.email = this.employerLogService.getEmail();
  }



}
