import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { RestRequestService } from '../../../service/rest-request.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datatable-lista-dipendenti',
  templateUrl: './datatable-lista-dipendenti.component.html',
  styleUrls: ['./datatable-lista-dipendenti.component.css']
})
export class DatatableListaDipendentiComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  headers = [
    'Action',
    'Nome',
    'Cognome',
    'Ruolo'
  ];
  rows = [];
  constructor(private restRequestService : RestRequestService, private router: Router) { 
  }

  ngOnInit(): void {
    console.log("gonna fire getListaPermessiDipendente");
    this.initDatatable();
    this.restRequestService.ricerca().subscribe(function(response){
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
          "targets": [0,1,2,3],
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

        var myrow = [
          '<i class="material-icons" title="Visualizza dettagli" (click)="this.dettagli(row)">visibility</i>',
          row['id_dipendente'],
          row['nome'],
          row['cognome'],
          row['ruolo']

          //'<i class="material-icons scarica_certificato" title="scarica certificato" id_certificato=\''+row['id']+'\' file='+row['certificatoBase64']+'>attach_file</i>',
          //download_link,
          //'<button class="btn btn-danger material-icons undo_request" id_richiesta=\''+row['id']+'\' title="annulla" '+abilitaCancellaPermesso+'>undo</button>'
        ];
        dtInstance.row.add(myrow).draw();
      });
    });
  }

  dettagli(row:any){
    console.log(row);
  }
}
