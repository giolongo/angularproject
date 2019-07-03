import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

    constructor() {

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
}