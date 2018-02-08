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
<<<<<<< HEAD
import { UsergroupsComponent } from './usergroups/usergroups.component';
=======
import { GroupchatComponent } from './groupchat/groupchat.component';

>>>>>>> 3fb483ace5c3637548ddadcb6b8e48222bf4582e

export const ROUTES: Routes = [
  { path: '', component: ChatComponent },
  { path: 'profile/:email/:name', component: ProfileComponent },
  { path: 'user/group', component: UsergroupsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: UserComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'groups', component: GroupComponent },
<<<<<<< HEAD
  { path: 'groups/:groupname', component: GroupdetailComponent },
  { path: 'groups/:groupname/join', component: JoinComponent },
  { path: 'groups/add', component: AddComponent },
  { path: '**', redirectTo: '' }
=======
  { path: 'groups/add', component: AddComponent },
  { path: 'groups/chat/:gname', component: GroupchatComponent },
     { path: 'groups/:groupname', component: GroupdetailComponent},
     { path: 'groups/:groupname/join', component: JoinComponent},
     { path: 'groups/add', component: AddComponent},
     { path: '**', redirectTo: '' }
>>>>>>> 3fb483ace5c3637548ddadcb6b8e48222bf4582e
];

export const myRoutes = RouterModule.forRoot(ROUTES);
