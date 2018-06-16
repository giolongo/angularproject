import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployerLogService } from '../../../service/employer-log.service';
import { RestRequestService } from '../../../service/rest-request.service';

@Component({
  selector: 'app-team-manager',
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.css']
})
export class TeamManagerComponent implements OnInit {

  private idTeam : String;
  constructor(private activatedRoute: ActivatedRoute,  private router: Router, private restRequestService:RestRequestService, private employerLogService : EmployerLogService) {}


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if(params.hasOwnProperty('id_team'))
      {
        this.idTeam = params.id_team;
        if(this.idTeam == "undefined"){
          this.router.navigate(['/ricercaRisultati']);
        }
        this.restRequestService.getTeam(this.idTeam).subscribe(function(response){
          this.datiDipendente = response['data'];
          console.log( this.datiDipendente);
        }.bind(this))
      }
    });
  }

}
