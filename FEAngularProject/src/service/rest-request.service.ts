import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
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

  login(username: String, password: String) : any{

    var credential;
    credential = {
      'username' : username,
      'password' : password
    }
    return this.http.post(this.context+'login', credential, httpOptions)
    .pipe(
    );
  }
}

interface UserCredential{
  username : String;
  password : String;
}
