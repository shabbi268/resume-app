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
import { GridModule, PageService, SortService, FilterService, GroupService, EditService } from '@syncfusion/ej2-angular-grids';
import { DataTablesModule } from 'angular-datatables';
import { DisplayComponent } from './display/display.component';


@NgModule({
  declarations: [
    AppComponent,
    SubmitFormComponent,
    ManagerComponent,
    routingComponents,
    DisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    GridModule,
    DataTablesModule,
  ],
  providers: [SubmituserService, PageService,
    SortService,
    FilterService,
    GroupService, EditService],
  bootstrap: [AppComponent],
})
export class AppModule { }
