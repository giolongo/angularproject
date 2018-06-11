import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../service/employer-log.service';
import { Router } from "@angular/router";
import { RestRequestService } from '../../service/rest-request.service';

@Component({
  selector: 'app-registra-team',
  templateUrl: './registra-team.component.html',
  styleUrls: ['./registra-team.component.css']
})
export class RegistraTeamComponent implements OnInit {
 
  public nomeTeam : String;

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
  public registraTeam(){
    
  }

}
