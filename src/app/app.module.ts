import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubmitFormComponent } from './submitform/submitform.component';
import { ManagerComponent } from './managerform/managerform.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubmituserService } from './submitform/submituser.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routingComponents } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    SubmitFormComponent,
    ManagerComponent,
    routingComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [SubmituserService],
  bootstrap: [AppComponent],
})
export class AppModule { }
