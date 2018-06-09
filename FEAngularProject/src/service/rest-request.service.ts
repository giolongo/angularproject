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
    this.endpoint['validateToken'] = this.context+'/validateToken';
    this.endpoint['getDatiUtente'] = this.context+'/getDatiUtente';
    this.endpoint['getSkills'] = this.context+'/getSkills';
    this.endpoint['getListSkills'] = this.context+'/getListSkills';
    //Gestione permessi
    this.endpoint['getPermessiEnumArray'] = this.context+'/getPermessiEnumArray';
    this.endpoint['registraPermesso'] = this.context+'/registraPermesso';
    this.endpoint['getListaPermessiDipendente'] = this.context+'/getListaPermessiDipendente';
   }

  login(username: String, password: String) : any{
    var credential;
      credential = {
        'codice_fiscale' : username,
        'password' : password
      }
      return this.http.post(this.endpoint['login'], credential, httpOptions);
  }

  registraDipendente(user:any):any{
    return this.http.post(this.endpoint['register'],user,httpOptions);
  }

  registraFerie(stanza:any):any{
    //return this.http.post(this.context+'register',stanza,httpOptions); 
  }

  validateToken(token : String) : any{
    var tokenJson = {
      'token' : token
    }
    return this.http.post(this.endpoint['validateToken'], tokenJson, httpOptions);
  }

  getDatiUtente(){
    var parameter = {
      'token' : sessionStorage.getItem("token")
    }
    return this.http.post(this.endpoint['getDatiUtente'],parameter, httpOptions);
  }

  getSkills(){
    var parameter = {
      'token' : sessionStorage.getItem("token")
    }
    return this.http.post(this.endpoint['getSkills'],parameter, httpOptions);
  }

  caricaSkills(){
    return this.http.get(this.endpoint['getListSkills']);
  }

  getPermessiEnumArray(){
    var parameter = {
      'token' : sessionStorage.getItem("token")
    }
    return this.http.post(this.endpoint['getPermessiEnumArray'], parameter, httpOptions);
  }
  registraPermesso(dataInizio, dataFine, note, tipologia, certificatoBase64){
    var parameter = {
      'token' : sessionStorage.getItem("token"),
      'dataInizio': dataInizio,
      'dataFine': dataFine,
      'note': note,
      'tipologia': tipologia,
      'certificatoBase64': certificatoBase64,
    }
    return this.http.post(this.endpoint['registraPermesso'], parameter, httpOptions);
  }
  getListaPermessiDipendente(){
    var parameter = {
      'token' : sessionStorage.getItem("token")
    }
    return this.http.post(this.endpoint['getListaPermessiDipendente'], parameter, httpOptions);
  }
}

