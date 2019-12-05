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
  positions = ['Systems Engineer', 'Software Developer', 'Full-Stack Developer', 'Java Developer', 'DevOps Engineer' ];
  resume;
  uploadmessage = '';
  submitmessage = '';
  filepath = '';

  constructor(public submituserservice: SubmituserService, public http: HttpClient) {
  }
  ngOnInit() {
  }

  // called on clicking the submit button, submits the user form and calls the method in service.ts file
  onSubmit(userForm: NgForm) {
    // alert('submit clicked');
    const user: User = {
      firstname: userForm.value.firstname,
      lastname: userForm.value.lastname,
      email: userForm.value.email,
      position: userForm.value.position,
      file: this.filepath,
      show: 'S'
    };
    this.submituserservice.addUser(user);
    this.submitmessage = 'Your Application for ' + user.position + ' Submitted Succesfully';
    userForm.reset();
  }

  // resume upload using is multer is done by http.post request
  onUpload(userForm: NgForm) {
    // alert('Upload clicked');
    const formdata = new FormData();
    formdata.append('file', this.resume);
    formdata.append('firstname', userForm.value.firstname);
    console.log(formdata);
    this.http.post<any>('http://localhost:4000/api/uploadfile', formdata).subscribe(
      (res) => {this.filepath = res.path; console.log(res.path); },
      (err) => console.log(err),
    );
    this.uploadmessage = 'Resume Upload Succesfull';
  }

  // choosen file is retrived and assigned to a variable for above upload method
  selectfile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.resume = file;
    }
  }

}



