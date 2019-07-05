import { Injectable } from '@angular/core';
import { RestRequestService } from '../service/rest-request.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

    constructor(protected restRequestService:RestRequestService) {
    }

    getBootstrapBreakpoint(){
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if(width < 768){
            return 'col';
        }
        
        if(width < 992){
            return 'col-md';
        }
        
        return 'col-lg';
    }

    generateSubTableNode(header, content, classes=""){
        return $("<tr>").append(
          $("<td>").addClass(classes)
            .css("border-right", "solid 1px lightgray")
            .html(header)
        ).append(
          $("<td>")
          .addClass(classes)
          .css("word-break", "break-all")
          .html(content)
        );
      }
    
    generateDownloadButton(row){
        return $("<div>").append(
            $("<a>").attr("href", this.restRequestService.getCertificateUrl(row["id"])).attr("download", row["nome_file_certificato"]).append(
            $("<button>")
                .addClass("btn")
                .addClass("btn-info")
                .addClass("material-icons")
                .text("attach_file")
            )
        );
    }

    generateDisabilitaPermesso(row){
        return $("<div>").append(
            $("<button>")
            .addClass("btn")
            .addClass("btn-danger")
            .addClass("material-icons")
            .addClass("undo_request")
            .attr("id_richiesta", row['id'])
            .attr("title", "Annulla")
            .prop("disabled", row['disabilitaCancellaPermesso'])
            .text("undo")
        );
    }

    generaBottoneApprovaPermesso(row){
        return $("<div>").append(
            $("<button>")
              .addClass("btn")
              .addClass("btn-success")
              .addClass("material-icons")
              .addClass("approve_request")
              .attr("id_richiesta", row['id'])
              .attr("title", "Approva")
              .prop("disabled", row['disabilitaApprovaPermesso'])
              .text("done")
          );
    }
    generaBottoneRifiutaPermesso(row){
        return $("<div>").append(
            $("<button>")
              .addClass("btn")
              .addClass("btn-danger")
              .addClass("material-icons")
              .addClass("refuse_request")
              .attr("id_richiesta", row['id'])
              .attr("title", "Rifiuta")
              .prop("disabled", row['disabilitaRifiutaPermesso'])
              .text("close")
          );
    }

    generaBottoneInfoDipendente(row){
        return $("<div>").append(
            $("<button>")
              .addClass('btn')
              .addClass('material-icons')
              .addClass('info-dipendente')
              .attr('info-dipendente', JSON.stringify(row))
              .text('expand_more')
              .css('width', '100%')
          );
    }
}