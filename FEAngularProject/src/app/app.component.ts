import {Component} from '@angular/core';
import {EmployerLogService} from '../service/employer-log.service';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('openClosed', [
      state('open', style({
        opacity: 1,
        height: '*'
      })),
      state('closed', style({
        opacity: .2,
        height: '*'
      })),
      transition('open <=> closed', [
        animate('.2s')
      ]),
    ]),
  ]// add NgbDropdownConfig to the component providers
})

export class AppComponent {
  searchField;
  isMenuOpen: boolean = false;
  title = 'Employer Manager';

  constructor(private employerLogService: EmployerLogService, config: NgbDropdownConfig, private router: Router) {
    // customize default values of dropdowns used by this component tree
    config.placement = 'bottom-left';
    config.autoClose = true;
  }

  search() {
    if (!this.searchField) this.searchField = "Team, Dipendente";
    this.router.navigate(['/ricercaRisultati']);
  }

  home() {
    this.router.navigate(['/']);
  }


  logout() {
    this.employerLogService.logOut();
  }

  ngOnInit() {
    if (!this.employerLogService.isLogged()) {
      //Se non lo è lo riporto alla pagina di Login
      if (!sessionStorage.getItem("token")) {
        this.router.navigate(['/login']);
      } else {
        this.employerLogService.refreshSessionByTokenRequest().subscribe(function (response) {
          if (!this.employerLogService.caricaUtenteLoggato(response)) {
            this.router.navigate(['/login']);
          }
        }.bind(this));
      }
    }
  }
}
