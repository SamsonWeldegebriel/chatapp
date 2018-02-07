import { ActivatedRoute } from '@angular/router';

import { GroupServiceService } from './../service/group-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs/Subscriber';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-groupdetail',
  templateUrl: './groupdetail.component.html'
})
export class GroupdetailComponent implements OnInit, OnDestroy {
  info: 'Group Detail';
  GroupDetailForm;
  group: Object;
  name: string;
  loginUser ;
  constructor(
    private route: ActivatedRoute,
    private groupservice: GroupServiceService,
    private authService: AuthService
  ) {
    this.route.params.subscribe(params => (this.name = params['groupname']));
    console.log('group name : ' + this.name);
    this.getgroup(this.name);
    this.loginUser = this.authService.getEmail();
  }

  ngOnInit() {
    this.GroupDetailForm = new FormGroup({
      groupName: new FormControl(),
      groupDes: new FormControl(),
      groupPic: new FormControl(),
      joinButton: new FormControl(),
      leavebutton: new FormControl(),
      btnJoin: new FormControl(),
      btnLeave: new FormControl(),
      btnDetail: new FormControl()
    });
  }

  ngOnDestroy() {}

  getgroup(name) {
    this.groupservice.getGroupByName(name).subscribe(
      res => {
        (this.group = res), console.log(this.group);
      },
      error => console.log(error),
      () => console.log('Done!')
    );

    console.log(this.group);
  }

  MemberGroup() {
     this.groupservice.getUserMemberGroup(this.loginUser);

  }
}
