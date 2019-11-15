import { User } from '../user';
import { HttpClient } from '@angular/common/http';

export class SubmituserService {
  user1 = new User('Shabbi', 'Kesa', 'kesash@mail.uc.edu', 'A');
  userlist: User[] = [this.user1];
  http: HttpClient;
  constructor() {}

  getUsers() {
    return [...this.userlist];
  }
  addUser(user: User) {
    this.userlist.push(user);
    return;
  }
}
