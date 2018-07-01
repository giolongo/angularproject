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
  tableReady : boolean;
  dtOptions: DataTables.Settings = {};

  headers = [
    'Action',
    'Id',
    'Nome',
    'Cognome',
    'Ruolo'
  ];
  rows = [];
  constructor(private restRequestService : RestRequestService, public router: Router) { 
    this.tableReady = false;
  }

  ngOnInit(): void {
    this.initDatatable();
    this.restRequestService.ricerca('dipendenti').subscribe(function(response){
      this.rows = response["data"];
      this.render();
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
        "orderable": true
        },
        {
        "targets": -2,
        "orderable": true
        },
        {
        "targets": -3,
        "orderable": true
        },
        {
          "targets": -4,
          "orderable": true
        },
        {
          className: "text-center",
          "targets": [0,1,2,3,4],
        }
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Italian.json"
      }
    };
  }

  render(): void {
    var __this = this;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.clear().draw();
      this.rows.forEach(function (row) {

        var myrow = [
          '<a class="valid-action"> <i class="material-icons view_dettagli" id_dipendente=\''+row['id_dipendente']+'\' title="Visualizza Skill">visibility</button> </a>',
          row['id_dipendente'],
          row['nome'],
          row['cognome'],
          row['ruolo']
        ];
        dtInstance.row.add(myrow).draw();
      });
      __this.bindBottoni(dtInstance);
    });
    this.tableReady = true;
  }
  
  bindBottoni(dtInstance){
    var __this = this;
    $('app-datatable-lista-dipendenti').on('click', '.view_dettagli', function(){
      /* __this.router.navigate(['/skillDipendente/' + $(this).attr('id_dipendente')]); */
      __this.redirect($(this).attr('id_dipendente'));
    });
  }

  redirect(idDipendente : string){
    console.log('/skillDipendente/' + idDipendente);
    this.router.navigate (['/skillDipendente/' + idDipendente]);
  }
}
