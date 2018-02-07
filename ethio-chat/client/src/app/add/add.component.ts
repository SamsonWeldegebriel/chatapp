import { Validators } from '@angular/forms';
import { Component, OnInit, Output } from '@angular/core';
import { GroupServiceService } from '../service/group-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addGroupForm: FormGroup;
  group;
  // Object = {
  //   gname: '',
  //   description: '',
  //   pic: '',
  //   users: [{ uname: '', status: '' }]
  // };
  title: { String: 'Create New Group' };

  @Output() addGroup = new EventEmitter();

  constructor(
    private service: GroupServiceService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.addGroupForm = formBuilder.group({
      gname: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      pic: new FormControl(),
      btnSave: new FormControl(),
      section: new FormControl(),
      users: [{ fullName: this.authService.getName(), status: 'member', uname: this.authService.getEmail()}]
    });

  }

  ngOnInit() {}

  saveGroup() {
    console.log('add Group');
    console.log( 'user' + this.authService.getEmail());
    this.service
      .add(this.addGroupForm.value)
      .subscribe(
        res => console.log(res),
        error => console.log(Error),
        () => console.log('Join Done!')
      );
    this.addGroup.emit('click');
  }
}
