import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { EmployerLogService } from '../../service/employer-log.service';

@Component({
  selector: 'app-vista-principale',
  templateUrl: './vista-principale.component.html',
  styleUrls: ['./vista-principale.component.css']
})
export class VistaPrincipaleComponent implements OnInit {
  private isLogin : boolean;
  constructor(private router: Router, private userService : EmployerLogService) {

   }

  ngOnInit() {
    if(this.userService){
      this.userService.isLogged().subscribe(userService => this.isLogin = userService);
    }
    if(!this.userService.utenteLoggato){
      //Se non lo è lo riporto alla pagina di Login
      this.router.navigate(['/login']);
    }
    
  }

}
