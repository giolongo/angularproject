import { Component, OnInit } from '@angular/core';
import { RestRequestService } from '../../../../service/rest-request.service';

@Component({
  selector: 'app-modulo-richiesta-permesso-dipendente',
  templateUrl: './modulo-richiesta-permesso-dipendente.component.html',
  styleUrls: ['./modulo-richiesta-permesso-dipendente.component.css']
})
export class ModuloRichiestaPermessoDipendenteComponent implements OnInit {
  dataInizio : any;
  dataFine : any;
  certificatoBase64 : String;
  nomeCertificatoCaricato : String;
  permessiEnumArray : any;
  tipologia : String;
  note : String;
  constructor(private restRequestService : RestRequestService) { 
    this.nomeCertificatoCaricato = "";
    this.restRequestService.getPermessiEnumArray().subscribe(function(result){
      this.permessiEnumArray = result['data'];
      console.log(result);
    }.bind(this));

  }

  ngOnInit() {

  }

  setFileName(event){
    var file = event.target.files[0];
    this.nomeCertificatoCaricato = file.name;

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      this.certificatoBase64 = reader.result;
    }.bind(this);
    reader.onerror = function (error) {
      alert('Error: '+ error);
    };
  }
  registraPermesso(){
    this.restRequestService.registraPermesso(this.dataInizio, this.dataFine, this.note, this.tipologia, this.certificatoBase64).subscribe(function(){

    }.bind(this));
  }
}
