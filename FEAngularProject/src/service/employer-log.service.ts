import { Injectable } from '@angular/core';
import { User } from '../app/common/class/user';
import { Observable, of } from 'rxjs';
import { RestRequestService } from './rest-request.service';
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class EmployerLogService {

  utenteLoggato : User;

  constructor(private httpService : RestRequestService, private router: Router) {
/*     this.utenteLoggato = new User;
    this.utenteLoggato.name="Pippo";
    this.utenteLoggato.surname="De Pippis";
    this.utenteLoggato.role="Manager"; */
   }
   

  isLogged() : Observable<boolean>{
    var logged = false;
    if(this.utenteLoggato){
      logged= true;
    }
    return of(logged);
  }

  logIn(username: String, password: String) : boolean{
    if(!this.utenteLoggato || !this.utenteLoggato.token){
      this.httpService.login(username, password);
    }
    
    return;
    //TODO: Inserire il metodo del service rest-request che effettua la login e il caricamento dell'utente
  }

  logOut() : boolean{
    delete this.utenteLoggato;
    this.router.navigate(['/login']);
    return;
    //TODO: Inserire il metodo del service rest-request che effettua il logout
  }

  utenteLog() : User{
    return this.utenteLoggato;
  }

  isManager() : boolean{
    var result = false;
    if( this.utenteLoggato.ruolo == 'Manager'){
      result = true;
    }
    return result;
  }
}
