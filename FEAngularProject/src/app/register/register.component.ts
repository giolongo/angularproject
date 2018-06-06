import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RestRequestService } from '../../service/rest-request.service';
import { EmployerLogService } from '../../service/employer-log.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user : any;
  private ferie : any;
  private team : any;
  private numberOfDipendents: Number;
  private dipendente : boolean;
  private ferieVisible : boolean;
  private teamVisible : boolean;
  constructor(private userService : EmployerLogService, private router : Router, private http : RestRequestService) {
    //this.isLogin = false;
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
/*    //Controllo che l'utente sia loggato
    if(!this.userService.utenteLoggato){
      //Se non lo è lo riporto alla pagina di Login
      if(!sessionStorage.getItem("token")){
        this.router.navigate(['/login']);
      }else{
        this.userService.refreshSessionByTokenRequest().subscribe(function(response){
          if(!this.userService.caricaUtenteLoggato(response)){
            this.router.navigate(['/login']);
          }else if(response['data'].ruolo == 'manager'){
              this.isManager = true;
          }
        }.bind(this));
      }
    }else{
      //Vedo se è un Manager; Questa funzionalità è abilitata solo ai Manager
      this.isManager = this.userService.isManager();
    }
*/ }

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
