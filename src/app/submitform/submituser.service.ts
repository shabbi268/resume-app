import { User } from '../user';

export class SubmituserService {
  userlist: User[] = [];

  getUsers() {
    return [...this.userlist];
  }
  addUser(user: User) {
    this.userlist.push(user);
  }
}
