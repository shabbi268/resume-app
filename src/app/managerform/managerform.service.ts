import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from '../manager';


@Injectable({
  providedIn: 'root'
})
export class ManagerformService {
  loggedmanager: Manager[] = [];
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
}
