import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SubmituserService {
  file: File;
  user1 = new User('Shabbi', 'Kesa', 'kesash@mail.uc.edu', 'A', 'Sample File', 'S');
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
  addfilepath(filepath, userForm: NgForm) {
    console.log(filepath);
    const li = [userForm.value.firstname, filepath];
    this.http.put('http://localhost:4000/api/addfilepath', li).subscribe((responsedata: any) => {
      console.log(filepath);
    });
    return;
  }

  // Below function is not used for upload
}
