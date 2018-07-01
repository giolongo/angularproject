import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployerLogService } from '../../../service/employer-log.service';
import { RestRequestService } from '../../../service/rest-request.service';

@Component({
  selector: 'app-skill-dipendente-dipendenti',
  templateUrl: './skill-dipendente-dipendenti.component.html',
  styleUrls: ['./skill-dipendente-dipendenti.component.css']
})
export class SkillDipendenteDipendentiComponent implements OnInit {

  private idDipendente : String;
  datiDipendente : any;
  isReady : boolean;
  constructor(private activatedRoute: ActivatedRoute,  private router: Router, private restRequestService:RestRequestService, private employerLogService : EmployerLogService) {
    this.isReady = false;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if(params.hasOwnProperty('id_dipendente'))
      {
        this.idDipendente = params.id_dipendente;
        if(this.idDipendente == "undefined"){
          this.router.navigate(['/ricercaRisultati']);
          return;
        }
        else if(this.employerLogService.getId() == this.idDipendente){
          this.router.navigate(['/visualizzaProfilo']);
        }
        this.restRequestService.getDipendeteInfoAndSkill(this.idDipendente).subscribe(function(response){
          this.datiDipendente = response['data'];
          this.isReady=true;
        }.bind(this))
      }
    });
  }

}
