// author Tigist Damesa ....05/02/2018

import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { UserService } from '../service/user.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid email profile'
  });

  constructor(public router: Router, public userService: UserService) {}

  registrationChanged = new Subject<boolean>();

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);

        this.userService.getUser().subscribe(user => {
          if (user) {
            this.isRegistered = true;
            this.router.navigate(['/home']);
          } else {
            const email = authResult.idTokenPayload.email;
            const name = authResult.idTokenPayload.name;
            this.router.navigate(['/profile', email, name]);
          }
        });
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('name', authResult.idTokenPayload.name);
    localStorage.setItem('expires_at', expiresAt);
  }

  logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('name');
    this.isRegistered = false;
    // Go back to the home route
    this.router.navigate(['/']);
  }

  getName() {
    return localStorage.getItem('name');
  }

  isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  get isRegistered(): boolean {
    return (
      this.isAuthenticated() && localStorage.getItem('isRegistered') === 'true'
    );
  }
  set isRegistered(value) {
    if (value) {
      localStorage.setItem('isRegistered', 'true');
    } else {
      localStorage.removeItem('isRegistered');
    }
    this.registrationChanged.next(value);
  }
}
