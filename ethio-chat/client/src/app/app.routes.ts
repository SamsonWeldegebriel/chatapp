import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { RouterModule, Routes } from '@angular/router';
import { GroupdetailComponent } from './groupdetail/groupdetail.component';
import { JoinComponent } from './join/join.component';
import { AddComponent } from './add/add.component';
import { ChatComponent } from './chat/chat.component';
import { UsergroupsComponent } from './usergroups/usergroups.component';

export const ROUTES: Routes = [
  { path: '', component: ChatComponent },
  { path: 'profile/:email/:name', component: ProfileComponent },
  { path: 'user/group', component: UsergroupsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: UserComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'groups', component: GroupComponent },
  { path: 'groups/:groupname', component: GroupdetailComponent },
  { path: 'groups/:groupname/join', component: JoinComponent },
  { path: 'groups/add', component: AddComponent },
  { path: '**', redirectTo: '' }
];

export const myRoutes = RouterModule.forRoot(ROUTES);
