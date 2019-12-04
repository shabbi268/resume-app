import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from '../manager';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class ManagerformService {
  constructor(private http: HttpClient) {}

  // addmanagers() {
  //   console.log('in mgr service add');
  //   const mgr: any[] = [];
  //   this.http.post('http://localhost:4000/api/addmanagers', mgr).subscribe((responsedata: any) => {
  //   });
  //   return;
  // }

  getManagers(): Observable<any> {
    return this.http.get('http://localhost:4000/api/managerlist');
  }

  managerauth(mgr: Manager[], manager: Manager) {
    for (const item of mgr) {
      if (item['username'] == manager['username']) {
        if (item['password'] == manager['password']) {
          console.log('Manager authentication sucess');
          return true;
        }
      }
    }
  }

  // hashauth(mgr: Manager[], manager: Manager) {
  //   for (const item of mgr) {
  //     if (item['username'] == manager['username']) {
  //       this.http.post('http://localhost:4000/api/manager', manager).subscribe((responsedata: any) => {
  //         console.log(responsedata);
  //       });
  //     }
  //   }
  // }

  deleteuser(user: User) {
    this.http.put('http://localhost:4000/api/deleteuser', user).subscribe((responsedata: any) => {
      console.log('in mgr service ts put call');
      });
    }
}
