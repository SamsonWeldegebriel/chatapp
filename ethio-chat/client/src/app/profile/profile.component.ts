// author Tigist Damesa ....05/02/2018

import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  NgControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profileform: FormGroup;
  pattern = '^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.profileform = formBuilder.group({
      fullName: [route.snapshot.paramMap.get('name'), Validators.required],
      email: [
        route.snapshot.paramMap.get('email'),
        [Validators.required, Validators.email]
      ],
      phone: ['', Validators.pattern(this.pattern)]
    });
  }

  // update existing user profile
  ngOnInit() {
    if (!this.route.snapshot.paramMap.get('name')) {
      this.userService.getUser().subscribe(user => {
        console.log(user);
        this.profileform.controls.email.setValue(user.email);
        this.profileform.controls.name.setValue(user.name);
        console.log(user.name);
        this.profileform.controls.phone.setValue(user.phone);
      });
    }
  }

  // checks if user exists or new and create or updates profile
  onSubmit() {
    if (this.route.snapshot.paramMap.get('name')) {
      this.userService.createUser(this.profileform.value).subscribe(result => {
        this.authService.isRegistered = true;
        this.router.navigate(['/home']);
      });
    } else {
      this.userService.updateUser(this.profileform.value).subscribe(result => {
        this.router.navigate(['/home']);
      });
    }
  }
  setDefault() {}
}
