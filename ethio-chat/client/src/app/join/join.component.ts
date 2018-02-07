import { Component, OnInit } from '@angular/core';
import { GroupServiceService } from '../service/group-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {
  name: String;
  constructor(
    private groupservice: GroupServiceService,
    private route: ActivatedRoute
  ) {
    console.log('HIIIIIii');
    this.route.params.subscribe(params => (this.name = params['groupname']));
    console.log('group name : ' + this.name);

  }

  ngOnInit() {}

  joinUsetTotheGroup(username) {
    // mock user for test
    alert('Thanks for join the group');

    console.log('your Join ' + name + ' group');
    this.groupservice
      .joinGroup(name, { uname: 'Join2', status: 'Member' })

      .subscribe(
        res => console.log(res),
        error => console.log(Error),
        () => console.log('Join Done!')
      );
  }
}
