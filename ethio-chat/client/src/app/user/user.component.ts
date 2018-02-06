// author Tigist Damesa ....06/02/2018

import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {}

  users;

  ngOnInit() {
    this.userService.getUsers('').subscribe(result => {
      this.users = result;
    });
  }
}
