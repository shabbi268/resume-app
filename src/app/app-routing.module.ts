import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerComponent } from './managerform/managerform.component';
import { SubmitFormComponent } from './submitform/submitform.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'managerlogin', component: ManagerComponent},
  { path: 'submitform', component: SubmitFormComponent},
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ManagerComponent, SubmitFormComponent, HomeComponent];
