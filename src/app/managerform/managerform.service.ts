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
  loginCheck(mgr: Manager) {
    let result: Manager = null;
    console.log('In login check service file');
    this.http.post<Manager>('http://localhost:4000/api/managerlist', mgr).subscribe((responsedata: any) => {
      result = responsedata[0];
      console.log(result);
      if (responsedata[0] == null) {
        console.log('invalid login');
      } else {
        console.log('Manager found and logged in');
        this.loggedmanager.push(responsedata);
        console.log(this.loggedmanager[0]);
      }
    });
  }
}
