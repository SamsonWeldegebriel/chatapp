import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';
import {UserComponent } from './user/user.component';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile/:email/:name', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: UserComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' }
];
