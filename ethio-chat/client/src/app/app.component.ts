import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isRegistered;
  constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }
  ngOnInit() {
    this.isRegistered = this.auth.isRegistered;
    this.auth.registrationChanged.subscribe(result => {
      this.isRegistered = result;
    });
  }
}
