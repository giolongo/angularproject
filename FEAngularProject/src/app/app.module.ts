import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { VistaPrincipaleComponent } from './vista-principale/vista-principale.component';
import { RegisterComponent } from './register/register.component';
import { CoreModule } from './common/core-module';


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
    FormsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
