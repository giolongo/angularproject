import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../service/employer-log.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin : boolean;
  codiceFiscale : String;
  password: String;
  constructor(private user : EmployerLogService, private router: Router) {
    user.isLogged().subscribe(userService => this.isLogin = userService);
  }

  ngOnInit() {
    if(this.isLogin){
      this.router.navigate(['/index']);
    }
  }

  login(){
/*     this.user.logIn(this.codiceFiscale, this.password).subscribe((data:any)=>{
      this.router.navigate(['/index']);
    }) */
    this.user.logIn(this.codiceFiscale, this.password);
  }

}
