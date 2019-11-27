import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Manager } from '../manager';
import { User } from '../user';
import { Observable, Subscriber, Subject } from 'rxjs';
import { ManagerformService } from './managerform.service';
import { DataTablesModule } from 'angular-datatables';
// tslint:disable-next-line: max-line-length
import { EditService, SelectionService, ToolbarService, SortService, FilterService, GroupService, PageService } from '@syncfusion/ej2-angular-grids';


@Component({
  selector: 'app-managerform',
  templateUrl: './managerform.component.html',
  styleUrls: ['./managerform.component.css'],
  providers: [SelectionService, ToolbarService, EditService, PageService,
    SortService,
    FilterService,
    GroupService, EditService],
  encapsulation: ViewEncapsulation.None
})

export class ManagerComponent implements OnInit {
  managerlist: any = [];
  userslist: User[] = [];
  user: User[] = [];
  usernames: any = [];
  passwords: any = [];
  auth = null;
  loggedin = null;
  index = null;
  public selectOptions: Object;
  public editSettings: Object;
  public toolbar: string[];
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
        if (j['show'] == 'S') {
        this.userslist.push(new User(j['firstname'],j['lastname'],j['email'],j['position']));
      }
    }
    });
  }

  public getJSON(url): Observable<any> {
    return this.http.get(url);
  }


   ngOnInit() {
    this.user = this.userslist;
    console.log('In mgr comp ng oninit');
    console.log(this.user);
    this.selectOptions = { persistSelection: true };
    this.editSettings = { allowDeleting: true };
    this.toolbar = ['Delete'];
  }

   login(loginform: NgForm) {
    alert('Login clicked');
    const mgr: Manager = {
      username: loginform.value.username,
      password: loginform.value.password
    };
    this.auth = this.managerformservice.managerauth(this.managerlist, mgr);
    if (this.auth) {
      this.loggedin = true;
    } else {
      console.log('Invalid credentials');
      loginform.reset();
    }
    return;
}

   managerList() {
    this.managerformservice.getManagers().subscribe((data: {}) => {
      console.log(data);
      this.managerlist = data;
    });
  }

    delete(user: User) {
      console.log('In mgr cmpt ts delete function');
      this.managerformservice.deleteuser(user);
      this.index = this.userslist.indexOf(user);
      if (this.index > -1) {
        this.userslist.splice(this.index, 1);
      }
      this.user = this.userslist;

      // window.location.reload();
  }
}
