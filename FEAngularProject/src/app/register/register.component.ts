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
  private stanza : any;
  private isManager;
  private isLogin;
  private dipendente : boolean;
  private room : boolean;
  constructor(private userService : EmployerLogService,  private router: Router, private http:RestRequestService) {
    this.isLogin = false;
    this.dipendente = true;
    this.user = {};
    this.stanza = {};
  }

  ngOnInit() {
    //Controllo che l'utente sia loggato
    if(this.userService){
      this.userService.isLogged().subscribe(userService => this.isLogin = userService);
    }
    if(!this.isLogin){
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

  registraStanza():boolean{
    console.log(this.stanza);
    this.http.registraStanza(this.stanza);
    return;
  }


}
