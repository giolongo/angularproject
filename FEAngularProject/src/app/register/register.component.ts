import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../service/employer-log.service';
import { Router } from "@angular/router";
import { RestRequestService } from '../../service/rest-request.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
//È il caso di sostituire any con una classe apposita? Eventualmente va sostiuito qui, e su httpRequestService
export class RegisterComponent implements OnInit {
  private user : any;
  private ferie : any;
  private team : any;
  private isManager;
  private isLogin;
  private numberOfDipendents: Number;
  private dipendente : boolean;
  private ferieVisible : boolean;
  private teamVisible : boolean;
  constructor(private router: Router, private http:RestRequestService, private userService:EmployerLogService) {
    this.isLogin = false;
    this.dipendente = true;
    this.ferieVisible = false;
    this.teamVisible = false;
    this.user = {};
    this.ferie = {};
    this.team = {};
    this.team.dipendente=[];
    this.numberOfDipendents = 1;
  }

  ngOnInit() {
    //Controllo che l'utente sia loggato
    if(!this.userService.utenteLoggato){
      //Se non lo è lo riporto alla pagina di Login
      this.router.navigate(['/login']);
    }else{
      //Vedo se è un Manager; Questa funzionalità è abilitata solo ai Manager
      this.isManager = this.userService.isManager();
    }
  }

  registraDipendente():boolean{
    console.log(this.user);
    this.http.registraDipendente(this.user);
    return;
  }

  registraFerie():boolean{
    console.log(this.ferie);
    this.http.registraFerie(this.ferie);
    return;
  }

  registraTeam():boolean{
    console.log(this.team);
    return;
  }


}
