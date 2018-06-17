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
  constructor(private activatedRoute: ActivatedRoute,  private router: Router, 
    private restRequestService:RestRequestService, private employerLogService : EmployerLogService, 
    private skillsService:SkillsService) {}


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if(params.hasOwnProperty('id_team')){
        this.idTeam = params.id_team;
        if(this.idTeam == "undefined"){
          this.router.navigate(['/ricercaRisultati']);
        }
        this.restRequestService.getTeam(this.idTeam).subscribe(function(response){
          this.datiTeam = response['data'];
          console.log( this.datiTeam);
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
}
