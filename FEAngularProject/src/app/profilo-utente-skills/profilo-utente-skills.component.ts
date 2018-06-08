import { Component, OnInit } from '@angular/core';
import { RestRequestService } from '../../service/rest-request.service';
import { SkillsService } from '../../service/skills.service';


@Component({
  selector: 'app-profilo-utente-skills',
  templateUrl: './profilo-utente-skills.component.html',
  styleUrls: ['./profilo-utente-skills.component.css']
})
export class ProfiloUtenteSkillsComponent implements OnInit {
  public listSkills : any;
  public allSkill : any;
  public skills : any;
  private newSkill = {};
  constructor(private restRequestService:RestRequestService, private skillsService:SkillsService) {
    this.restRequestService.getSkills().subscribe(function(response){
      this.skills = response['data'];


      if(!this.skillsService.getSkills()){
        this.restRequestService.caricaSkills().subscribe(function(response){
          this.skillsService.caricaSkills(response);
          this.allSkill = this.skillsService.getSkills();
          this.rimuoviSkillPresenti();
       }.bind(this));
      }else{
        this.allSkill = this.skillsService.getSkills();
        this.rimuoviSkillPresenti();
      }

    }.bind(this));


   }


  ngOnInit() {
  }

  aggiornaSkillDipendente(){
    console.log(this.skills);
  }

  rimuoviSkillPresenti(){
    for (var i = 0; i< this.allSkill.length ; i++){
      for(var j = 0; j< this.skills.length ; j++){
        if(this.allSkill[i].id_skill == this.skills[j].skill[0].id_skill){
          console.log(true);
          this.allSkill.splice(i,1);
        }
      }
    }
  }

  aggiungi(){
    //Creo una copia non referenziata dell'oggetto
    let newSkillConverter =JSON.parse(JSON.stringify(this.skills[0]));
    var arrayString = this.newSkill['id'].split(',');
    //Modifico i dati che ho inserito tramite il form
    newSkillConverter.id_skill = arrayString[0];
    newSkillConverter.seniority = this.newSkill['seniority'];
    newSkillConverter.skill[0].nome = arrayString[1];
    //Inserisco nell'array
    this.skills.push(newSkillConverter);
  }

}
