import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { RestRequestService } from '../../../service/rest-request.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-datatable-lista-team',
  templateUrl: './datatable-lista-team.component.html',
  styleUrls: ['./datatable-lista-team.component.css']
})
export class DatatableListaTeamComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  headers = [
    '',
    'Nome'
  ];
  rows = [];
  constructor(private restRequestService : RestRequestService, private router: Router) { 
  }

  ngOnInit(): void {
    console.log("gonna fire getListaPermessiDipendente");
    this.initDatatable();
    this.restRequestService.ricerca('team').subscribe(function(response){
      console.log(response["data"]);
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
          "orderable": true
          },
        {
          className: "text-center",
          "targets": [0,1],
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
          '<i class="material-icons view_dettagli" id_team=\''+row['id_team']+'\' title="Visualizza Skill">visibility</button>',
          row['nome'],

          //'<i class="material-icons scarica_certificato" title="scarica certificato" id_certificato=\''+row['id']+'\' file='+row['certificatoBase64']+'>attach_file</i>',
          //download_link,
          //'<button class="btn btn-danger material-icons undo_request" id_richiesta=\''+row['id']+'\' title="annulla" '+abilitaCancellaPermesso+'>undo</button>'
        ];
        dtInstance.row.add(myrow).draw();
      });
      __this.bindBottoni(__this, dtInstance);
    });
  }
  bindBottoni(__this, dtInstance){
    $('body').on('click', '.view_dettagli', function(){
      var id_team = $(this).attr('id_team');
      var rowInstance = this;
      console.log(id_team);
      __this.router.navigate(['/skillDipendente/'+id_team]);
    });
  }
}