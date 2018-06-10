import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { RestRequestService } from '../../../../service/rest-request.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datatable-lista-permessi-dipendenti',
  templateUrl: './datatable-lista-permessi-dipendenti.component.html',
  styleUrls: ['./datatable-lista-permessi-dipendenti.component.css']
})
export class DatatableListaPermessiDipendentiComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  headers = [
    '',
    'Stato richiesta',
    'Data inizio',
    'Data fine',
    'Totale giorni',
    'Certificato',
    '*Annulla richiesta'
  ];
  rows = [];
  constructor(private restRequestService : RestRequestService, private router: Router) { 
  }

  ngOnInit(): void {
    console.log("gonna fire getListaPermessiDipendente");
    this.initDatatable();
    this.restRequestService.getListaPermessiDipendente().subscribe(function(response){
      this.rows = response["data"];
      this.render(this);
    }.bind(this));
  }
  ngOnDestroy(): void {
  }

  initDatatable(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      columnDefs: [
        {
        "targets": 0,
        "orderable": false
        },
        {
        "targets": -1,
        "orderable": false
        },
        {
        "targets": -2,
        "orderable": false
        },
        {
          className: "text-center",
          "targets": [0,1,2,3,4,5,6],
        }
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Italian.json"
      }
    };
  }

  render(__this): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.clear().draw();
      this.rows.forEach(function (row) {
        var base64 = row['certificatoBase64'];
        if(base64.indexOf('base64,') == -1){
          return "";
        }
        var ext = null;
        if(base64.indexOf('image') != -1 ){
          ext = '.jpg';
        }else if(base64.indexOf('text') != -1){
          ext = '.txt';
        }else{
          return;
        }
        var baseFile = 'data:application/octet-stream';
        var strippedFile = base64.split(';base64,')[1];
        base64 = baseFile+';base64,'+strippedFile;


        var download_link = "<a href=\""+base64+"\" download=\"file"+ext+"\"><button class=\"btn btn-info material-icons\">attach_file</button></a>";
        var abilitaCancellaPermesso = "";
        if(row['stato_richiesta'] == 'approvato'){
          abilitaCancellaPermesso = 'disabled';
        }
        var myrow = [
          row['id'],
          row['stato_richiesta'],
          row['data_inizio'],
          row['data_fine'],
          row['totale_giorni'],
          //'<i class="material-icons scarica_certificato" title="scarica certificato" id_certificato=\''+row['id']+'\' file='+row['certificatoBase64']+'>attach_file</i>',
          download_link,
          '<button class="btn btn-danger material-icons undo_request" id_richiesta=\''+row['id']+'\' title="annulla" '+abilitaCancellaPermesso+'>undo</button>'
        ];
        dtInstance.row.add(myrow).draw();
      });
      __this.bindCancellaPermesso(__this, dtInstance);
    });
  }
  bindCancellaPermesso(__this, dtInstance){
    $('body').on('click', '.undo_request', function(){
      var id_permesso = $(this).attr('id_richiesta');
      var rowInstance = this;
      __this.restRequestService.cancellaPermesso(id_permesso).toPromise().then(function(response){
        if(!response['success']){
          console.log(response['error']);
        }else{
          var row = dtInstance.row($(rowInstance).parents('tr')).remove();
          dtInstance.draw();
        }
      }).catch(function(e){
        console.log(e);
      });
    });
  }
}
