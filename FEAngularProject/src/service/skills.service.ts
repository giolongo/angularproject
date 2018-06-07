import { Injectable } from '@angular/core';
import { RestRequestService } from './rest-request.service';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private skills: String[];
  constructor(private restRequestService:RestRequestService) { 
  }

  richiediSkills() : any{
    if((!this.skills)){
      return this.restRequestService.caricaSkills();
    }
  }

  caricaSkills(response : any){
    if(!response['success']){
      return false;
    }
    this.skills = response['data'];
  }


  getSkills() : String[]{
    return this.skills;
  }
}
