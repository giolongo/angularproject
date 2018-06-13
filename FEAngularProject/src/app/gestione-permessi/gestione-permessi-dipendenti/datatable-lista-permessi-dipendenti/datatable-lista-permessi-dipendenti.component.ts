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
    'Note',
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
          className: "details-control",
          "targets": 1
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

        var infoDipendente = $("<div>").append(
          $("<button>")
            .addClass('btn')
            .addClass('material-icons')
            .addClass('info-dipendente')
            .attr('info-dipendente', JSON.stringify({'note': row['note']}))
            .text('expand_more')
            .css('width', '100%')
        ).html();
        var download_link = "<a href=\""+base64+"\" download=\"file"+ext+"\"><button class=\"btn btn-info material-icons\">attach_file</button></a>";
        var abilitaCancellaPermesso = "";
        if(row['stato_richiesta'] == 'approvato'){
          abilitaCancellaPermesso = 'disabled';
        }
        var myrow = [
          row['id'],
          infoDipendente,
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
      __this.bindBottoni(__this, dtInstance);
      __this.initRow(__this, dtInstance);
    });
  }

  bindBottoni(__this, dtInstance){
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
