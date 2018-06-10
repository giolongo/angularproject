import { Component, OnInit } from '@angular/core';
import { RestRequestService } from '../../service/rest-request.service';
import { SkillsService } from '../../service/skills.service';


@Component({
  selector: 'app-profilo-utente-skills',
  templateUrl: './profilo-utente-skills.component.html',
  styleUrls: ['./profilo-utente-skills.component.css']
})
export class ProfiloUtenteSkillsComponent implements OnInit {
  public allSkill : any;
  public skills : any;
  private newSkill = {};
  constructor(private restRequestService:RestRequestService, private skillsService:SkillsService) {
    this.restRequestService.getSkills().subscribe(function(response){
      this.skills = response['data'];
      this.allSkill = this.skillsService.getSkills();
      this.rimuoviSkillPresenti();
      }.bind(this));
  }


  ngOnInit() {
    this.restRequestService.getSkills().subscribe(function(response){
      this.skills = response['data'];
      this.allSkill = this.skillsService.getSkills();
      this.rimuoviSkillPresenti();
    }.bind(this));
  }

  aggiungi(){
    this.restRequestService.aggiungiSkill(this.newSkill).subscribe(function(response){
      this.restRequestService.getSkills().subscribe(function(response){
        this.skills = response['data'];
        this.allSkill = this.skillsService.getSkills();
        this.rimuoviSkillPresenti();
        }.bind(this));
    }.bind(this));
  }

  modifica(skill:any){
    console.log(skill);
    this.restRequestService.modificaSkill(skill).subscribe(function(response){
      this.restRequestService.getSkills().subscribe(function(response){
        this.skills = response['data'];
        this.allSkill = this.skillsService.getSkills();
        this.rimuoviSkillPresenti();
        }.bind(this));
    }.bind(this));
  }

  rimuovi(skill:any){
    console.log(skill);
    this.restRequestService.rimuoviSkill(skill.id_skill).subscribe(function(response){
      this.restRequestService.getSkills().subscribe(function(response){
        this.skills = response['data'];
        this.allSkill = this.skillsService.getSkills();
        this.rimuoviSkillPresenti();
        }.bind(this));
    }.bind(this));
  }

  rimuoviSkillPresenti(){
    for (var i = 0;this.allSkill[i] && i< this.allSkill.length ; i++){
      for(var j = 0;j< this.skills.length ; j++){
        if(this.allSkill[i].id_skill == this.skills[j].skill[0].id_skill){
          console.log(true);
          this.allSkill.splice(i,1);
          i=i-1;
        }
      }
    }
    console.log(this.allSkill.length);
  }

}
