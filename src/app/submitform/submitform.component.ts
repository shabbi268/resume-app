import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { SubmituserService } from '../submitform/submituser.service';




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


  constructor(public submituserservice: SubmituserService) {
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
  }

  onUpload() {
    alert('Upload clicked');
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



