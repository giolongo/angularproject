import { Component } from '@angular/core';
import { EmployerLogService } from '../service/employer-log.service';
import { NgModel } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers
})
export class AppComponent {
  csrf_token : String; //For Laravel autentication
  searchField;
  isLogoutVisible;
  title = 'Employer Manager';
  private isLogin : boolean;
  private name : String;
  private isManager : boolean;
  constructor(private userService : EmployerLogService, config: NgbDropdownConfig) {
    // customize default values of dropdowns used by this component tree
    config.placement = 'bottom-left';
    config.autoClose = true;
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
  }

/*   setUser(nome : String, isManager : boolean){
    this.name = nome;
    this.isManager = isManager;
  } */


}
