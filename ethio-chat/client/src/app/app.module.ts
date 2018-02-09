import { MaterialModule } from './material.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';


import { ROUTES } from './app.routes';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from './service/user.service';
import { GroupServiceService } from './service/group-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { AuthInterceptor } from './auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { MatListModule } from '@angular/material/list';
import { AddComponent } from './add/add.component';
import { GroupdetailComponent } from './groupdetail/groupdetail.component';
import { JoinComponent } from './join/join.component';
import { GroupComponent } from './group/group.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './service/chat.service';
import { SocketService } from './service/socket.service';
import { UsergroupsComponent } from './usergroups/usergroups.component';
import { GroupchatComponent } from './groupchat/groupchat.component';
@NgModule({
  declarations: [
    AppComponent,

    CallbackComponent,
    ProfileComponent,
    UserComponent,
    AddComponent,
    GroupdetailComponent,
    JoinComponent,
    GroupComponent,
    ChatComponent,
    UsergroupsComponent,
    GroupchatComponent
  ],
  imports: [
    MaterialModule,
    MatFormFieldModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    HttpModule,
    MatButtonModule,
    MatListModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    AuthService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    GroupServiceService,
    ChatService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
