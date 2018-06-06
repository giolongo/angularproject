import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../service/employer-log.service';
import { Router } from "@angular/router";

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

  constructor(private employerLogService : EmployerLogService, private router: Router) { }

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
    console.log(this.nome);
    console.log(this.cognome);
    console.log(this.codiceFiscale);
    console.log(this.dataDiNascita);
    console.log(this.email);
    console.log(this.password);
  }

}
