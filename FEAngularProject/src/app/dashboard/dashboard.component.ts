import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../service/employer-log.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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

  search() {
    this.router.navigate(['/ricercaRisultati']);
  }

  registraUtente() {
    this.router.navigate(['/registraUtente']);
  }

  registraTeam() {
    this.router.navigate(['/registraTeam']);
  }

  visualizzaProfilo() {
    this.router.navigate(['/visualizzaProfilo']);
  }

}
