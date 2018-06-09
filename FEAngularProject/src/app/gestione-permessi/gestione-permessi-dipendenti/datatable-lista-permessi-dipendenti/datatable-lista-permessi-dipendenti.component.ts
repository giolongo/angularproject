import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-datatable-lista-permessi-dipendenti',
  templateUrl: './datatable-lista-permessi-dipendenti.component.html',
  styleUrls: ['./datatable-lista-permessi-dipendenti.component.css']
})
export class DatatableListaPermessiDipendentiComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  headers = [
    '',
    'Data richiesta',
    'Stato richiesta',
    'Data inizio',
    'Data fine',
    'Totale giorni',
    '*Annulla richiesta'
  ];
  rows = [
    { 
      'id': '1',
      "dataRichiesta": "07/06/2018", 
      "statoRichiesta": "Approvata", 
      "dataInizio": "02/08/2018", 
      "dataFine": "26/07/2018", 
      "totaleGiorni": "7",
    },
    { 
      'id': '2',
      "dataRichiesta": "07/06/2018", 
      "statoRichiesta": "Approvata", 
      "dataInizio": "02/08/2018", 
      "dataFine": "26/07/2018", 
      "totaleGiorni": "7", 
    },
    { 
      'id': '3',
      "dataRichiesta": "07/06/2018", 
      "statoRichiesta": "Approvata", 
      "dataInizio": "02/08/2018", 
      "dataFine": "26/07/2018", 
      "totaleGiorni": "7", 
    },
    { 
      'id': '4',
      "dataRichiesta": "07/06/2018", 
      "statoRichiesta": "Approvata", 
      "dataInizio": "02/08/2018", 
      "dataFine": "26/07/2018", 
      "totaleGiorni": "7", 
    }
  ];
  constructor() { 
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      columnDefs: [
        { "orderable": false, "targets": 6 }
      ],
      language: {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Italian.json"
      }
    };
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }
}
