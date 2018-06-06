import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { EmployerLogService } from '../../service/employer-log.service';
import { RestRequestService } from '../../service/rest-request.service';

@Component({
  selector: 'app-vista-principale',
  templateUrl: './vista-principale.component.html',
  styleUrls: ['./vista-principale.component.css']
})
export class VistaPrincipaleComponent implements OnInit {
  private isLogin : boolean;
  constructor(private router: Router, private userService : EmployerLogService, private httpService : RestRequestService) {}

  ngOnInit() {
    if(!this.userService.utenteLoggato){
      if(sessionStorage.getItem("token")){
        this.userService.refreshSessionByTokenRequest().subscribe(function(response){
          if(!this.userService.caricaUtenteLoggato(response)){
            this.router.navigate(['/login']);
          }
        }.bind(this));
        }else{
          this.router.navigate(['/login']);
        }
    }  
    this.httpService.getDatiUtente().subscribe(function(response){
      console.log(response);
    });
  }

}
