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
            this.restRequestService.caricaSkills().subscribe(function(response){
              this.skillsService.caricaSkills(response);
              this.allSkill = this.skillsService.getSkills();
            }.bind(this));
            if(this.datiDipendente.length>0){
              this.rimuoviSkillPresenti();
            }
           }.bind(this));
          }
        }.bind(this));
      }
    });

  }

  modifica(skill:any){
    console.log(skill);
    this.restRequestService.modificaSkill(skill, this.idDipendente).subscribe(function(response){
      this.restRequestService.getDipendeteInfoAndSkill(this.idDipendente).subscribe(function(response){
        this.datiDipendente = response['data'];
        this.allSkill = this.skillsService.getSkills();
        this.rimuoviSkillPresenti();
        }.bind(this));
    }.bind(this));
  }

  aggiungi(){
    this.restRequestService.aggiungiSkill(this.newSkill, this.idDipendente).subscribe(function(response){
      this.restRequestService.getDipendeteInfoAndSkill(this.idDipendente).subscribe(function(response){
        this.datiDipendente = response['data'];
        this.allSkill = this.skillsService.getSkills();
        this.rimuoviSkillPresenti();
        }.bind(this));
    }.bind(this));
  }

  rimuovi(skill:any){
    console.log(skill);
    this.restRequestService.rimuoviSkill(skill.id_skill, this.idDipendente).subscribe(function(response){
      this.restRequestService.getDipendeteInfoAndSkill(this.idDipendente).subscribe(function(response){
        this.datiDipendente = response['data'];
          this.restRequestService.caricaSkills().subscribe(function(response){
            this.skillsService.caricaSkills(response);
            this.allSkill = this.skillsService.getSkills();
            if(this.datiDipendente.length>0){
              this.rimuoviSkillPresenti();
            }
          }.bind(this));
        }.bind(this));
    }.bind(this));
  }

  rimuoviSkillPresenti(){
    for (var i = 0;this.allSkill[i] && i< this.datiDipendente.length ; i++){
      for(var j = 0;this.allSkill[i] && j< this.datiDipendente.length ; j++){
        if(this.allSkill[i].id_skill == this.datiDipendente[j].skill[0].id_skill){
          console.log(true);
          this.allSkill.splice(i,1);
          i=i-1;
        }
      }
    }
    console.log(this.allSkill.length);
  }
}
