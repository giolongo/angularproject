import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modulo-richiesta-permesso-dipendente',
  templateUrl: './modulo-richiesta-permesso-dipendente.component.html',
  styleUrls: ['./modulo-richiesta-permesso-dipendente.component.css']
})
export class ModuloRichiestaPermessoDipendenteComponent implements OnInit {
  dataInizio : any;
  dataFine : any;
  fileBase64 : String;
  nomeCertificatoCaricato : String;
  constructor() { 
    this.dataInizio = {
      "giorno" : "",
      "mese" : "",
      "anno" : ""
    };
    this.dataFine = {
      "giorno" : "",
      "mese" : "",
      "anno" : ""
    };
    this.nomeCertificatoCaricato = "";
  }

  ngOnInit() {
  }

  setFileName(event){
    var file = event.target.files[0];
    this.nomeCertificatoCaricato = file.name;

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      this.fileBase64 = reader.result;
      //enable send button
      console.log(this.fileBase64);
    }.bind(this);
    reader.onerror = function (error) {
      alert('Error: '+ error);
    };
  }
}
