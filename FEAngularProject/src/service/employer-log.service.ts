import { Injectable } from '@angular/core';
import { User } from '../app/common/class/user';
import { Observable, of } from 'rxjs';
import { RestRequestService } from './rest-request.service';

@Injectable({
  providedIn: 'root'
})
export class EmployerLogService {

  utenteLoggato : User;
  csrf_token : String;

  constructor(private httpService : RestRequestService) {
    this.utenteLoggato = new User;
    this.utenteLoggato.id = 123;
    this.utenteLoggato.name="Pippo";
    this.utenteLoggato.surname="De Pippis";
    this.utenteLoggato.role="Semplice";
    this.utenteLoggato.roleValue=0;
   }
   

  isLogged() : Observable<boolean>{
    var logged;
    if(this.utenteLoggato){
      logged= true;
    }
    return of(logged);
  }

  logIn(username: String, password: String) : boolean{
    var isLogIn;
    var result = this.httpService.login(username,password);
    return;
    //TODO: Inserire il metodo del service rest-request che effettua la login e il caricamento dell'utente
  }

  logOut() : boolean{
    delete this.utenteLoggato;
    return;
    //TODO: Inserire il metodo del service rest-request che effettua il logout
  }

  utenteLog() : User{
    return this.utenteLoggato;
  }

  getCsrfToken() : String{
    return this.csrf_token;
  }

}
