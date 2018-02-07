import { Component, OnInit } from '@angular/core';
import { GroupServiceService } from '../service/group-service.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
  name: String;
  constructor(
    private groupservice: GroupServiceService,
    private route: ActivatedRoute,
    private userService:UserService,
    private authService: AuthService
  ) {
    console.log('HIIIIIii');
    this.route.params.subscribe(params => (this.name = params['groupname']));
    console.log('group name : ' + this.name);

  }

  ngOnInit() {}

  joinUsetTotheGroup(groupname) {
    // mock user for test
    const object = {'username' :  this.authService.getEmail(), 'groupname' : groupname};

    this.userService.addJoinedGroup(object)
      .subscribe(
        res => console.log(res),
        error => console.log(Error),
        () => console.log('Join Done!')
      );
    alert('Thanks for join the group');

    console.log('your Join ' + name + ' group');

  }
}
