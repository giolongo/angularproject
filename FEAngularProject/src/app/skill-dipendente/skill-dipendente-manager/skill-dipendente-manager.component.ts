import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployerLogService } from '../../../service/employer-log.service';
import { RestRequestService } from '../../../service/rest-request.service';
import { SkillsService } from '../../../service/skills.service';

@Component({
  selector: 'app-skill-dipendente-manager',
  templateUrl: './skill-dipendente-manager.component.html',
  styleUrls: ['./skill-dipendente-manager.component.css']
})
export class SkillDipendenteManagerComponent implements OnInit {

  private idDipendente : String;
  datiDipendente : any;
  allSkill : any;
  private newSkill = {};
  constructor(private activatedRoute: ActivatedRoute,  private router: Router, 
    private restRequestService:RestRequestService, private employerLogService : EmployerLogService, private skillsService:SkillsService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if(params.hasOwnProperty('id_dipendente'))
      {
        this.idDipendente = params.id_dipendente;
        if(this.idDipendente == "undefined"){
          this.router.navigate(['/ricercaRisultati']);
        }
        else if(this.employerLogService.getId() == this.idDipendente){
          this.router.navigate(['/visualizzaProfilo']);
        }
        this.restRequestService.getDipendeteInfoAndSkill(this.idDipendente).subscribe(function(response){
          this.datiDipendente = response['data'];
          console.log( this.datiDipendente);
          if(!this.skillsService.getSkills()){
            //Carica lista delle skill
            this.restRequestService.caricaSkills().subscribe(function(response){
            this.skillsService.caricaSkills(response);
            this.allSkill = this.skillsService.getSkills();
            this.rimuoviSkillPresenti();
           }.bind(this));
          }
        }.bind(this));
      }
    });

  }

  rimuoviSkillPresenti(){
    for (var i = 0;this.allSkill[i] && i< this.datiDipendente[0].skill.length ; i++){
      for(var j = 0;this.allSkill[i] && j< this.datiDipendente[0].skill.length ; j++){
        if(this.allSkill[i].id_skill == this.datiDipendente[0].skill[j].id_skill){
          console.log(true);
          this.allSkill.splice(i,1);
          i=i-1;
        }
      }
    }
    console.log(this.allSkill.length);
  }

}
