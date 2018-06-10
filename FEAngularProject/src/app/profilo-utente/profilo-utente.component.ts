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
  public skills : any;
  constructor(private employerLogService : EmployerLogService, private router: Router, 
    private restRequestService:RestRequestService, private skillsService:SkillsService) { 
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

    if(!this.skillsService.getSkills()){
      //Carica lista delle skill
      this.restRequestService.caricaSkills().subscribe(function(response){
        this.skillsService.caricaSkills(response);
     }.bind(this));
    }
  }

}
