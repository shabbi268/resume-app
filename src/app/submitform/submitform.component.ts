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
  userslist: any = [];
  positions = ['A', 'B', 'C', 'D'];
  list = false;
  resume;

  constructor(public submituserservice: SubmituserService, public http: HttpClient) {
  }
  ngOnInit() {
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
    userForm.reset();
    this.list = false;
  }

  onUpload(userForm: NgForm) {
    alert('Upload clicked');
    const formdata = new FormData();
    formdata.append('file', this.resume);
    this.http.post<any>('http://localhost:4000/api/uploadfile', formdata).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  selectfile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.resume = file;
    }
  }

  userList() {
    this.list = true;
    this.userslist = [];
    this.submituserservice.getUsers().subscribe((data: {}) => {
      console.log(data);
      this.userslist = data;
    });
  }
}



