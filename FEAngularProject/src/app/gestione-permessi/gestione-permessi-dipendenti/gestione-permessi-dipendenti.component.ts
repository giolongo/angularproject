import { Component, OnInit } from '@angular/core';
import { EmployerLogService } from '../../../service/employer-log.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-gestione-permessi-dipendenti',
  templateUrl: './gestione-permessi-dipendenti.component.html',
  styleUrls: ['./gestione-permessi-dipendenti.component.css']
})
export class GestionePermessiDipendentiComponent implements OnInit {

  constructor(private employerLogService : EmployerLogService, private router: Router) { }

  ngOnInit() {
  }

}
