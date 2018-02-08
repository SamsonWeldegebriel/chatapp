import { Component, OnInit, group } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl } from '@angular/forms/src/model';
import 'rxjs/operators/map';

@Component({
  selector: 'app-usergroups',
  templateUrl: './usergroups.component.html',
  styleUrls: ['./usergroups.component.css']
})
export class UsergroupsComponent implements OnInit {
  groups = [];
  userGroupForm: FormGroup;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.userService.getUserGroup().subscribe(
      res => {
        this.groups = res;
        console.log('respoce', res);
      },
      error => console.log(error),
      () => console.log('Done!')
    );

  }
}
