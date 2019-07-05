//Il codice è analogo al child-component del component gestione-permessi-dipendenti,
//cambia l'endpoint dal quale recupera i dati.
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { RestRequestService } from '../../../../service/rest-request.service';
import { UtilsService } from '../../../../service/utils.service';

@Component({
  selector: 'app-datatable-lista-permessi-manager',
  templateUrl: './datatable-lista-permessi-manager.component.html',
  styleUrls: ['./datatable-lista-permessi-manager.component.css']
})
export class DatatableListaPermessiManagerComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  tableReady : boolean;
  headers = [
    '',
    'Info',
    'Stato',
    //'Data inizio',
    //'Data fine',
    'Totale giorni',
    'File',
    'Approva',
    'Rifiuta'
  ];

  rows = [];
  constructor(private restRequestService : RestRequestService,  private utilsService : UtilsService, private router: Router) { 
    this.tableReady = false;
  }

  ngOnInit(): void {
    this.initDatatable();
    this.restRequestService.getListaPermessiSubordinati().toPromise().then(function(response){
      this.rows = response["data"];
      this.render();
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
        //show columns for col screen
        {
          className: "text-center d-none d-lg-table-cell",
          "targets": [6,5,4]
        },
        //show columns for col screen
        {
          className: "text-center d-none d-md-table-cell",
          "targets": [3]
        },
        //hide columns for col screen
        {
          className: "text-center d-table-cell",
          "targets": [2,1,0]
        }
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Italian.json"
      },
    }
  }

  render(): void {
    var __this = this;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.clear().draw();
      this.rows.forEach(function (row) {

        var disabilitaApprovaPermesso = row['stato_richiesta'] == 'approvato';
        var disabilitaRifiutaPermesso = row['stato_richiesta'] == 'rifiutato';
        row['disabilitaApprovaPermesso'] = disabilitaApprovaPermesso;
        row['disabilitaRifiutaPermesso'] = disabilitaRifiutaPermesso;
        var bottoneInfoDipendente = __this.utilsService.generaBottoneInfoDipendente(row);
        var bottoneDonwloadCertificato = __this.utilsService.generateDownloadButton(row);
        var bottoneApprovaPermesso = __this.utilsService.generaBottoneApprovaPermesso(row);
        var bottoneRifiutaPermesso = __this.utilsService.generaBottoneRifiutaPermesso(row);
        var myrow = [
          row['id'],
          $(bottoneInfoDipendente).html(),
          row['stato_richiesta'],
          //row['data_inizio'],
          //row['data_fine'],
          row['totale_giorni'],
          $(bottoneDonwloadCertificato).html(),
          $(bottoneApprovaPermesso).html(),
          $(bottoneRifiutaPermesso).html()
        ];
        dtInstance.row.add(myrow).draw();
      });
      __this.bindBottoni(dtInstance);
    });
  }

  bindApprovaPermesso(){
    var __this = this;
    $('body .datatable-permessi-manager').off('click', '.approve_request');
    $('body .datatable-permessi-manager').on('click', '.approve_request', function(){
      console.log('approva!');
      __this.tableReady = false;
      var id_permesso = $(this).attr('id_richiesta');
      var rowInstance = this;
      __this.restRequestService.approvaPermesso(id_permesso).toPromise().then(function(response){
        if(!response['success']){
          console.log(response['error']);
          __this.tableReady = true;
        }else{
          __this.restRequestService.getListaPermessiSubordinati().toPromise().then(function(response){
            __this.rows = response["data"];
            __this.render();
            __this.tableReady = true;
          });
        }
      }).catch(function(e){
        console.log(e);
      });
    });
  }

  bindRifiutaPermesso(){
    var __this = this;
    $('body .datatable-permessi-manager').off('click', '.refuse_request');
    $('body .datatable-permessi-manager').on('click', '.refuse_request', function(){
      console.log('rifiuta!');
      __this.tableReady = false;
      var id_permesso = $(this).attr('id_richiesta');
      var rowInstance = this;
      __this.restRequestService.rifiutaPermesso(id_permesso).toPromise().then(function(response){
        if(!response['success']){
          console.log(response['error']);
          __this.tableReady = true;
        }else{
          __this.restRequestService.getListaPermessiSubordinati().toPromise().then(function(response){
            __this.rows = response["data"];
            __this.render();
            __this.tableReady = true;
          }.bind(this));
        }
      }).catch(function(e){
        console.log(e);
      });
    });
  }
  bindDettagliDipendente(dtInstance){
    var __this = this;
    $('body .datatable-permessi-manager').off('click', 'td.details-control button.info-dipendente');
    $('body .datatable-permessi-manager').on('click', 'td.details-control button.info-dipendente', function () {
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

  bindBottoni(dtInstance){
    this.bindApprovaPermesso();
    this.bindRifiutaPermesso();
    this.bindDettagliDipendente(dtInstance);
  }

  format(row) {
    //costruisce la sottotabella della datatable, torna l'html.
    return $("<div>").append(
      $("<table>")
        .addClass("col-12")
        .attr("cellpadding", "5")
        .attr("cellspacing", "0")
        .attr("border", "0")
        .css("padding-left", "50px")
        .append(
          this.utilsService.generateSubTableNode("Nome", row["nome"])
        ).append(
          this.utilsService.generateSubTableNode("Cognome", row["cognome"])
        ).append(
          this.utilsService.generateSubTableNode("Codice fiscale", row["codice_fiscale"])
        ).append(
          this.utilsService.generateSubTableNode("Data inizio", row["data_inizio"])
        ).append(
          this.utilsService.generateSubTableNode("Data fine", row["data_fine"])
        ).append(
          this.utilsService.generateSubTableNode("Note", row["note"])
        ).append(
          this.utilsService.generateSubTableNode("Totale giorni", row["totale_giorni"], "d-md-none")
        ).append(
          this.utilsService.generateSubTableNode("Certificato", this.utilsService.generateDownloadButton(row).html(), "d-lg-none")
        ).append(
          this.utilsService.generateSubTableNode("Annulla richiesta", this.utilsService.generaBottoneApprovaPermesso(row).html(), "d-lg-none")
        ).append(
          this.utilsService.generateSubTableNode("Annulla richiesta", this.utilsService.generaBottoneRifiutaPermesso(row).html(), "d-lg-none")
        )
    ).html();      
  }
}
