import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { SubmituserService } from '../submitform/submituser.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-submit-form',
  templateUrl: './submitform.component.html',
  styleUrls: ['./submitform.component.css']
})

export class SubmitFormComponent implements OnInit {
  user: User[] = [];
  positions = ['A', 'B', 'C', 'D'];
  constructor(public submituserservice: SubmituserService, private http: HttpClient) {

  }
  ngOnInit() {
    this.user = this.submituserservice.getUsers();
  }
  onSubmit(userForm: NgForm) {
    alert('submit clicked');
    const user: User = {
      firstname: userForm.value.firstname,
      lastname: userForm.value.lastname,
      email: userForm.value.email,
      position: userForm.value.position
    };
    this.submituserservice.addUser(user);
    this.http.post('http://localhost:4000/api/submitform', user).subscribe((responsedata: any) => {
      console.log(user);
    });
    userForm.reset();
  }
  onUpload() {
    alert('Upload clicked');
  }
  userList() {
    this.http.get('http://localhost:4000/api/submitform').subscribe((responsedata: any) => {
      console.log(responsedata);
    });
  }
}



