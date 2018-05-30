import { Component } from '@angular/core';
import { EmployerLogService } from '../service/employer-log.service';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  csrf_token : String; //For Laravel autentication
  searchField;
  isLogoutVisible;
  title = 'Rooms And Employer Manager';
  private isLogin : boolean;
  private name : String;
  constructor(private userService : EmployerLogService){
    userService.isLogged().subscribe(userService => this.isLogin = userService);
    this.name = this.userService.utenteLog().name;
  }
  
  search() {
    console.log(this.searchField);
  }

  visibleLogout(){
    if(!this.isLogoutVisible){
      this.isLogoutVisible = true;
    }else{
      this.isLogoutVisible = false;
    }
  }

  logout(){
    this.userService.logOut();
    this.userService.isLogged().subscribe(userService => this.isLogin = userService);
  }

}
