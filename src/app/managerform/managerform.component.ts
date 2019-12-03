import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Manager } from '../manager';
import { User } from '../user';
import { Observable, Subscriber, Subject } from 'rxjs';
import { ManagerformService } from './managerform.service';
import { DataTablesModule } from 'angular-datatables';
// tslint:disable-next-line: max-line-length
import { SearchService, SortService, FilterService, GroupService, PageService, GridComponent, ToolbarItems, ToolbarService } from '@syncfusion/ej2-angular-grids';


@Component({
  selector: 'app-managerform',
  templateUrl: './managerform.component.html',
  styleUrls: ['./managerform.component.css'],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService, ToolbarService, SearchService],
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
  public toolbarOptions: ToolbarItems[];
  @ViewChild('grid', null)
    public grid: GridComponent;
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
      this.user = this.userslist;
    });
  }

  public getJSON(url): Observable<any> {
    return this.http.get(url);
  }


   ngOnInit() {
    this.user = this.userslist;
    // console.log('called ngoninit');
    // console.log(this.user);
    this.toolbarOptions = ['Search'];
  }

   login(loginform: NgForm) {
    // alert('Login clicked');
    const mgr: Manager = {
      username: loginform.value.username,
      password: loginform.value.password
    };
    this.auth = this.managerformservice.managerauth(this.managerlist, mgr);
    if (this.auth) {
        this.loggedin = true;
    } else {
      console.log('Invalid credentials');
      alert('Invalid credentials! Kindly enter correct Username and Password');
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
      // console.log('In mgr cmpt ts delete function');
      this.managerformservice.deleteuser(user);
      this.index = this.userslist.indexOf(user);
      if (this.index > -1) {
        this.userslist.splice(this.index, 1);
      }
      this.grid.refresh();
  }

    deletegrid(): void {
      console.log(this.grid.getSelectedRowIndexes()[0]);
      const selectedRow: number = this.grid.getSelectedRowIndexes()[1];
      if (this.grid.getSelectedRowIndexes().length) {
        this.user.splice(selectedRow, 1);
      } else {
        alert('No records selected for delete operation');
      }
      this.grid.refresh();
  }
    logout() {
      window.location.reload();
    }
}
