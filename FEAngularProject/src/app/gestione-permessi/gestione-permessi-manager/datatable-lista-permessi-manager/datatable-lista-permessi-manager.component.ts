import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { RestRequestService } from '../../../../service/rest-request.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datatable-lista-permessi-manager',
  templateUrl: './datatable-lista-permessi-manager.component.html',
  styleUrls: ['./datatable-lista-permessi-manager.component.css']
})
export class DatatableListaPermessiManagerComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  tableReady = false;
  headers = [
    '',
    'Dipendente',
    'Stato richiesta',
    'Data inizio',
    'Data fine',
    'Totale giorni',
    'Certificato',
    'Approva',
    'Rifiuta'
  ];
  rows = [];
  constructor(private restRequestService : RestRequestService, private router: Router) { 
  }

  ngOnInit(): void {
    this.initDatatable();
    this.restRequestService.getListaPermessiSubordinati().subscribe(function(response){
      this.rows = response["data"];
      this.render(this);
      this.tableReady = true;
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
          className: "details-control",
          "targets": 1
        },
        {
        "targets": [0, -1, -2, -3],
        "orderable": false
        },
        {
          className: "text-center",
          "targets": [0,1,2,3,4,5,6,7,8],
        },
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Italian.json"
      }
    };
  }

  render(__this): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      __this.unbindBottoni();
      dtInstance.clear();
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
        var dettagliDipendente = JSON.stringify({
          'id': row['id'],
          'nome': row['nome'],
          'cognome': row['cognome'],
          'codice_fiscale': row['codice_fiscale'],
          'note' : row['note']
        });
        var infoDipendente = $("<div>").append(
          $("<label>")
            .text(row['nome']+" "+row['cognome'])
          )
          .append(
            $("<button>")
              .addClass('btn')
              .addClass('material-icons')
              .addClass('info-dipendente')
              .attr('info-dipendente', dettagliDipendente)
              .text('expand_more')
              .css('width', '100%')
          ).html();
        var myrow = [
          row['id'],
          infoDipendente,
          row['stato_richiesta'],
          row['data_inizio'],
          row['data_fine'],
          row['totale_giorni'],
          download_link,
          '<button class="btn btn-success material-icons approve_request" id_richiesta=\''+row['id']+'\' title="Approva">done</button>',
          '<button class="btn btn-danger material-icons refuse_request" id_richiesta=\''+row['id']+'\' title="Rifiuta">close</button>',
          
        ];
        dtInstance.row.add(myrow).draw();
      });
      __this.bindBottoni(__this, dtInstance);
      __this.initRow(__this, dtInstance);
    });
  }
  bindBottoni(__this, dtInstance){
    $('body').on('click', '.approve_request', function(){
      console.log('approva!');
      var id_permesso = $(this).attr('id_richiesta');
      var rowInstance = this;
      __this.restRequestService.approvaPermesso(id_permesso).toPromise().then(function(response){
        if(!response['success']){
          console.log(response['error']);
        }else{
          __this.restRequestService.getListaPermessiSubordinati().subscribe(function(response){
            __this.rows = response["data"];
            __this.render(__this);
          }.bind(this));
        }
      }).catch(function(e){
        console.log(e);
      });
    });

    
    $('body').on('click', '.refuse_request', function(){
      console.log('rifiuta!');
      __this.tableReady = false;
      var id_permesso = $(this).attr('id_richiesta');
      var rowInstance = this;
      __this.restRequestService.rifiutaPermesso(id_permesso).toPromise().then(function(response){
        if(!response['success']){
          console.log(response['error']);
          __this.tableReady = true;
        }else{
          __this.restRequestService.getListaPermessiSubordinati().subscribe(function(response){
            __this.rows = response["data"];
            __this.render(__this);
            __this.tableReady = true;
          }.bind(this));
        }
      }).catch(function(e){
        console.log(e);
      });
    });
  }
  unbindBottoni(){
    $('.datatable-permessi-manager').find('tbody').off('click', 'tr td.details-control');
  }
  format(data) {
      // `d` is the original data object for the row
      return $("<div>").append(
        $("<table>")
          .attr("cellpadding", "5")
          .attr("cellspacing", "0")
          .attr("border", "0")
          .css("padding-left", "50px")
          .append(
            $("<tr>").append(
              $("<td>").text("Nome")
            ).append(
              $("<td>").text(data["nome"])
            )
          )
          .append(
            $("<tr>").append(
              $("<td>").text("Cognome")
            ).append(
              $("<td>").text(data["cognome"])
            )
          )
          .append(
            $("<tr>").append(
              $("<td>").text("Codice fiscale")
            ).append(
              $("<td>").text(data["codice_fiscale"])
            )
          )
          .append(
            $("<tr>").append(
              $("<td>").text("Note")
            ).append(
              $("<td>").text(data["note"])
            )
          )
      ).html();      
  }

  initRow(__this, dtInstance){
      $('tbody').on('click', 'td.details-control button.info-dipendente', function () {
        var tr = $(this).closest('tr');
        var row = dtInstance.row( tr );
    
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            var data = $(this).attr('info-dipendente');
            console.log(data);
            data = JSON.parse(data);
            row.child( __this.format(data) ).show();
            tr.addClass('shown');
        }
    });
  }
}
