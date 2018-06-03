import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../app/common/class/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    //'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestRequestService {

  private context : String;
  private endpoint : Map<String, String>;

  constructor(private http: HttpClient) {
    this.context = 'http://localhost/angularproject/be';
    this.endpoint = new Map<String, String>();
    this.endpoint['login'] = this.context+'/login';
    this.endpoint['register'] = this.context+'/register';
   }

  login(username: String, password: String) : any{
    var credential;
      credential = {
        'codice_fiscale' : username,
        'password' : password
      }
      return this.http.post(this.endpoint['login'], credential, httpOptions).subscribe(function(response){
        this.utenteLoggato = new User();
        this.utenteLoggato.token = response['data'].token;
        this.utenteLoggato.nome = response['data'].nome;
        this.utenteLoggato.cognome = response['data'].cognome;
        this.utenteLoggato.ruolo = response['data'].ruolo;
        console.log(this.utenteLoggato);
        //redirect...
        //this.router.navigate(['/']);
      });
  }

  registraDipendente(user:any):any{
    return this.http.post(this.context+'register',user,httpOptions);
  }

  registraStanza(stanza:any):any{
    //return this.http.post(this.context+'register',stanza,httpOptions); 
  }
}

interface UserCredential{
  username : String;
  password : String;
}
