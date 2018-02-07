import { element } from 'protractor';
import { GroupServiceService } from './../service/group-service.service';
import { Component, OnInit } from '@angular/core';

import { Validators } from '@angular/forms';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  title = 'Group List';
  groups: any;
  name: string;
  groupForm;
  members;

  constructor(
    private groupservice: GroupServiceService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) {
    console.log('HIIIIIii');
    // this.route.params.subscribe( params => this.name= params['groupname']) ;
  }

  ngOnInit() {
    this.groupForm = new FormGroup({
      name: new FormControl(),
      btnJoin: new FormControl(),
      btnleave: new FormControl()
    });
    this.getAll();
  }

  getAll() {
    this.groupservice.getAllGroup().subscribe(
      res => {
        this.groups = res;
        console.log(res);
      },
      error => console.log(error),
      () => console.log('Done!')
    );
  }

  delete() {
    // let b = confirm('Are you sure?');
    // if(b){
    this.groupservice.delete(this.name).subscribe(
      res => {
        this.groups = res;
        console.log(res);
      },
      error => console.log(error),
      () => console.log('Done!')
    );

    //  }
  }

  member(groupname) {
    // users;
    this.groupservice.members(this.name).subscribe(
      res => {
        this.members = res;
      },
      error => console.log(error),
      () => console.log('Done!')
    );
  }

  // isMember(user, groupname){
  //    this.member(groupname);
  //   this.members.array.forEach(element => {if(element.uname===user.uname) return true})
  //   return false;

  // }


    //
    joinUsetTotheGroup(groupname) {
      // user join the group
      const object = {'username' :  this.authService.getEmail(), 'group' : groupname};

      this.userService.addJoinedGroup(object)
        .subscribe(
          res => console.log(res),
          error => console.log(Error),
          () => console.log('Join Done!')
        );
      alert('Thanks for join the group');

      console.log('your Join ' + name + ' group');

    }
  addGroupEvent() {
    console.log('add Event');
    this.getAll();
  }
}
