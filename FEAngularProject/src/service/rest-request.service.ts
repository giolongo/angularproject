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

  constructor(private http: HttpClient) {
    this.context = "http://localhost/angularproject/be/";
   }

  login(username: String, password: String, _token: String) : any{
    var credential;
      credential = {
        '_token' : _token,
        'email' : username,
        'password' : password
      }
      return this.http.post(this.context+'login', credential, httpOptions).subscribe(function(e){
        this.utenteLoggato = new User();
        this.utenteLoggato._token = _token;
        console.log(this.utenteLoggato);
      });
  }

  getToken():any{
    return this.http.get(this.context+'getToken');
  }
}

interface UserCredential{
  username : String;
  password : String;
}
