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
  deleteuser(user: User) {
    this.http.put('http://localhost:4000/api/deleteuser', user).subscribe((responsedata: any) => {
      console.log('in mgr service ts put call');
      });
    }
}
