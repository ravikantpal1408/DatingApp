import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private alert: AlertifyService) {
    this.loadUsers();
  }

  ngOnInit() {

  }


  loadUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users=users;
      console.log(users);
    }, error => {
      this.alert.error(error);
    });
  }

}
