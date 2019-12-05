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

  // retrieve managers using http get request
  getManagers(): Observable<any> {
    return this.http.get('http://localhost:4000/api/managerlist');
  }

  // Login authentication for manager credentials is done here
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

  // soft delete of user is done using the http.put request
  deleteuser(user: User) {
    this.http.put('http://localhost:4000/api/deleteuser', user).subscribe((responsedata: any) => {
      console.log('in mgr service ts put call');
      });
    }
}
