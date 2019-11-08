import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { SubmituserService } from '../submitform/submituser.service';


@Component({
  selector: 'app-submit-form',
  templateUrl: './submitform.component.html'


})
export class SubmitFormComponent implements OnInit {
  submituserservice: SubmituserService;
  item = null;
  user: User[] = [];
  positions = ['A', 'B', 'C', 'D'];
  onUpload() {
    alert('Upload clicked');
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
    alert(this.submituserservice.userlist.length);
  }
  constructor(submituserservice: SubmituserService) {
    this.submituserservice = submituserservice;
  }
  ngOnInit() {
    this.user = this.submituserservice.getUsers();
    alert('initial users in list: ' + this.user.length);
  }
}


