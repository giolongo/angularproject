import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployerLogService } from '../../../service/employer-log.service';
import { RestRequestService } from '../../../service/rest-request.service';
import { SkillsService } from '../../../service/skills.service';

@Component({
  selector: 'app-team-manager',
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.css']
})
export class TeamManagerComponent implements OnInit {
  private datiTeam : any;
  private idTeam : String;
  private allSkill : any;
  private allDipendenti : any;
  private newDipendente = {};
  private isLoading : boolean = false;
  constructor(private activatedRoute: ActivatedRoute,  private router: Router, 
    private restRequestService:RestRequestService, private employerLogService : EmployerLogService, 
    private skillsService:SkillsService) {}


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if(params.hasOwnProperty('id_team')){
        this.idTeam = params.id_team;
        if(this.idTeam == "undefined"){
          this.router.navigate(['/ricercaRisultati']);
          return;
        }
        this.restRequestService.getTeam(this.idTeam).subscribe(function(response){
          this.datiTeam = response['data'];
          this.restRequestService.ricerca('dipendenti').subscribe(function(response){
            this.allDipendenti = response["data"];
            this.rimuoviDipendentiPresenti();
          }.bind(this))
        }.bind(this))
        this.restRequestService.caricaSkills().subscribe(function(response){
          this.skillsService.caricaSkills(response);
          this.allSkill = this.skillsService.getSkills();
        }.bind(this));
        console.log(this.allSkill);
      }
    });
  }

  compareSkill(skillUser : string, skill : string) :boolean {
    var isEqual = false;
    if(skillUser == skill){
      isEqual = true;
    }
    return isEqual;
  }
  
  rimuovi(team : String, dipendente : String){
    this.restRequestService.deleteEmployerInTeam(team, dipendente).subscribe(function(response){
      this.restRequestService.getTeam(this.idTeam).subscribe(function(response){
        this.datiTeam = response['data'];
          this.restRequestService.ricerca('dipendenti').subscribe(function(response){
            this.allDipendenti = response["data"];
            this.rimuoviDipendentiPresenti();
          }.bind(this))
        console.log( this.datiTeam);
      }.bind(this))
    }.bind(this))
    console.log(dipendente);
  }

  aggiungi(){
    this.isLoading = true;
    this.restRequestService.addEmployerInTeam(this.idTeam, this.newDipendente).subscribe(function(response){
      this.restRequestService.getTeam(this.idTeam).subscribe(function(response){
        this.datiTeam = response['data'];
        this.rimuoviDipendentiPresenti();
        this.isLoading = false;
        this.newDipendente = {};
      }.bind(this))
    }.bind(this))
  }

  rimuoviDipendentiPresenti(){
    for (var i = 0;this.allDipendenti[i] && i< this.allDipendenti.length ; i++){
      for(var j = 0;this.allDipendenti[i] && j< this.datiTeam[0].team_dipendente.length ; j++){
        if(this.datiTeam[0].team_dipendente[j]){
          if(this.allDipendenti[i].id_dipendente == this.datiTeam[0].team_dipendente[j].id_dipendente){
            console.log(true);
            this.allDipendenti.splice(i,1);
            i=i-1;
          }
        }
      }
    }
    console.log(this.allSkill.length);
  }
}
