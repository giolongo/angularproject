import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modulo-richiesta-permesso-dipendente',
  templateUrl: './modulo-richiesta-permesso-dipendente.component.html',
  styleUrls: ['./modulo-richiesta-permesso-dipendente.component.css']
})
export class ModuloRichiestaPermessoDipendenteComponent implements OnInit {
  dataInizio : String;
  dataFine : String;
  certificato : String;
  
  constructor() { }

  ngOnInit() {
  }

}
