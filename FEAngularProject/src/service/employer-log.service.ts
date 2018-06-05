import { Injectable } from '@angular/core';
import { User } from '../app/common/class/user';
import { Observable, of } from 'rxjs';
import { RestRequestService } from './rest-request.service';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class EmployerLogService {

  utenteLoggato : User;

  constructor(private httpService : RestRequestService, private router: Router) {}
  

  isLogged() : Observable<boolean>{
    var logged = false;
    if(this.utenteLoggato){
      logged= true;
    }
    return of(logged);
  }

  logIn(username: String, password: String){
    if((!this.utenteLoggato || !this.utenteLoggato.token)){
      this.httpService.login(username, password).subscribe(function(response){
        this.caricaUtenteLoggato(response);
        this.router.navigate(['/index']);
      }.bind(this))
    }
  }

  refreshSessionByTokenRequest(){
    if(sessionStorage.getItem("token")){
      return this.httpService.validateToken(sessionStorage.getItem("token"));
    }
    return null;
  }

  logOut() : boolean{
    delete this.utenteLoggato;
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
    return;
    //TODO: Inserire il metodo del service rest-request che effettua il logout
  }

  caricaUtenteLoggato(response : any){
    if(!response['success']){
      return false;
    }
    this.utenteLoggato = new User();
    this.utenteLoggato.token = response['data'].token;
    sessionStorage.setItem("token", response['data'].token);
    this.utenteLoggato.nome = response['data'].nome;
    this.utenteLoggato.cognome = response['data'].cognome;
    this.utenteLoggato.ruolo = response['data'].ruolo;
    return true;
  }

  isManager() : boolean{
    var result = false;
    if( this.utenteLoggato.ruolo == 'manager'){
      result = true;
    }
    return result;
  }
}
