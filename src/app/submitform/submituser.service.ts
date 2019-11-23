import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubmituserService {
  user1 = new User('Shabbi', 'Kesa', 'kesash@mail.uc.edu', 'A');
  userlist: User[] = [this.user1];



  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:4000/api/submitform');
  }

  addUser(user: User) {
    this.userlist.push(user);
    this.http.post('http://localhost:4000/api/submitform', user).subscribe((responsedata: any) => {
      console.log(user);
    });
    return;
  }

  uploadFile(file: File) {
    console.log('In file upload in service file-start');
    console.log(file);
    this.http.post('http://localhost:4000/api/uploadfile', file).subscribe((responsedata: any) => {
    console.log('In file upload in service file-end');
    });
  }
}
