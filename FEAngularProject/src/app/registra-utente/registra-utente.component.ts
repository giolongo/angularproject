import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../service/employer-log.service';
import { Router } from "@angular/router";
import { RestRequestService } from '../../service/rest-request.service';

@Component({
  selector: 'app-registra-utente',
  templateUrl: './registra-utente.component.html',
  styleUrls: ['./registra-utente.component.css']
})
export class RegistraUtenteComponent implements OnInit {
  public nome : String;
  public cognome: String;
  public codiceFiscale: String;
  public dataDiNascita: String;
  public email: String;
  public password: String;
  public ruolo: String;
  public error: String;
  constructor(private employerLogService : EmployerLogService, private router: Router, private restRequestService:RestRequestService) { }

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
  }

  public registraDipendente(){
    var newDipendente ={
      'nome' : this.nome,
      'cognome' : this.cognome,
      'codice_fiscale' : this.codiceFiscale,
      'email' : this.email,
      'password' : this.password,
      'ruolo' : this.ruolo,
      'data_nascita' : this.dataDiNascita
    }
    this.restRequestService.addDipendente(newDipendente).subscribe(function(response){
      if(!response['success']){
        this.error = response['error'];
      }else{
        this.router.navigate(['skillDipendente/'+response['data'].id_dipendente]);
      }
    }.bind(this))
  }

}
