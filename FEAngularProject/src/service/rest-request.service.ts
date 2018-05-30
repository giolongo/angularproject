import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestRequestService {

  private context : String;

  constructor(private http: HttpClient) {
    this.context = "localhost:8080/RoomsAndEmployersManage/api/";
   }

  login(username: String, password: String) : any{

    var credential;
    credential = {
      'username' : username,
      'password' : password
    }
    return this.http.post(this.context+'login', credential, null);
  }
}

interface UserCredential{
  username : String;
  password : String;
}
