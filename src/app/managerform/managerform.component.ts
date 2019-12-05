import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Manager } from '../manager';
import { User } from '../user';
import { Observable, Subscriber, Subject } from 'rxjs';
import { ManagerformService } from './managerform.service';
// tslint:disable-next-line: max-line-length
import { SearchService, SortService, FilterService, GroupService, PageService, GridComponent, ToolbarItems, ToolbarService, SelectionSettingsModel } from '@syncfusion/ej2-angular-grids';


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
  invalid = null;
  public selectionOptions: SelectionSettingsModel;
  public toolbarOptions: ToolbarItems[];
  @ViewChild('grid', null)
    public grid: GridComponent;


  constructor(public managerformservice: ManagerformService, private http: HttpClient) {
    this.managerformservice.getManagers();
    this.getJSON('http://localhost:4000/api/managerlist').subscribe(data => {
      for (const i of data) {
        this.managerlist.push(new Manager(i['username'], i['password']));
        this.usernames.push(i['username']);
        this.passwords.push(i['password']);
        }
      // console.log('Total number of managers is:' + this.managerlist.length);
    });
    this.getJSON('http://localhost:4000/api/submitform').subscribe(data => {
      for (const j of data) {
        if (j['show'] == 'S') {
        this.userslist.push(new User(j['firstname'],j['lastname'],j['email'],j['position'], j['file'], j['show']));
        this.user.push(new User(j['firstname'],j['lastname'],j['email'],j['position'], j['file'], j['show']));
      }
    }
      // this.user = this.userslist;
    });
  }

  public getJSON(url): Observable<any> {
    return this.http.get(url);
  }


  ngOnInit() {
    this.toolbarOptions = ['Search'];
    this.selectionOptions = { type: 'Single' };
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
        this.grid.refresh();
    } else {
      console.log('Invalid credentials');
      alert('Invalid credentials! Kindly enter correct Username and Password');
      this.invalid = true;
      loginform.reset();
      // window.location.reload();
    }
    return;
}
  managerList() {
    this.managerformservice.getManagers().subscribe((data: {}) => {
      console.log(data);
      this.managerlist = data;
    });
  }

  deletegrid(): void {
      const selectedRow: number = this.grid.getSelectedRowIndexes()[0];
      // console.log(selectedRow);
      if (this.grid.getSelectedRowIndexes().length) {
        // console.log(this.user[selectedRow]);
        this.managerformservice.deleteuser(this.user[selectedRow]);
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
