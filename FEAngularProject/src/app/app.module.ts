import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EmployerLogService } from '../service/employer-log.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { VistaPrincipaleComponent } from './vista-principale/vista-principale.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VistaPrincipaleComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [EmployerLogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
