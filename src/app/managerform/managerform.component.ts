import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Manager } from '../manager';
import { User } from '../user';
import { Observable, Subscriber } from 'rxjs';
import { ManagerformService } from './managerform.service';


@Component({
  selector: 'app-managerform',
  templateUrl: './managerform.component.html',
  styleUrls: ['./managerform.component.css']
})

export class ManagerComponent implements OnInit {
  managerlist: any = [];
  userslist: User[] = [];
  usernames: any = [];
  passwords: any = [];
  loggedin = null;
  constructor(public managerformservice: ManagerformService, private http: HttpClient) {
    this.getJSON('http://localhost:4000/api/managerlist').subscribe(data => {
      for (const i of data) {
        this.managerlist.push(new Manager(i['username'], i['password']));
        this.usernames.push(i['username']);
        this.passwords.push(i['password']);
    }
      console.log('Total number of managers is:' + this.managerlist.length);
  });
    this.getJSON('http://localhost:4000/api/submitform').subscribe(data => {
      for (const j of data) {
        this.userslist.push(new User(j['firstname'],j['lastname'],j['email'],j['position']));
      }
    });
  }

  public getJSON(url): Observable<any> {
    return this.http.get(url);
  }


   ngOnInit() {
   }

   login(loginform: NgForm) {
    alert('Login clicked');
    const mgr: Manager = {
      username: loginform.value.username,
      password: loginform.value.password
    };
    this.managerformservice.loginCheck(mgr);
    console.log(this.managerformservice.loggedmanager['username']);
    return;
}
   managerList() {
    this.managerformservice.getManagers().subscribe((data: {}) => {
      console.log(data);
      this.managerlist = data;
    });
  }

  }
