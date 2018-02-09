import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { SocketService } from '../service/socket.service';
import { UserService } from '../service/user.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  connection;
  message;
  username = '';
  loggedInMemberUsername = '';
  loggedInMemberEmail = '';
  LoggedInMemberName = '';
  showSpinner = false;
  chatOpenned = false;
  receiverName = '';
  receiverUsername = '';
  loggedInMember: {};

  newChats: any;

  // new chat message object
  newChatMessage = {
    message: '',
    sender: '',
    receiver: '',
    date: new Date(),
    status: false
  };
  chats = [];
  users;
  isloggedin;

  filteredChats = [];
  constructor(
    private chatService: ChatService,
    public authService: AuthService,
    private socketService: SocketService,
    private userService: UserService
  ) {
    authService.handleAuthentication();
    // this.getChats();
    this.userService.getAllUsers().subscribe(res => {
      console.log(res);
      this.users = res;
    });

    this.loggedInMemberUsername = this.authService.getEmail();
    this.LoggedInMemberName = this.authService.getName();
    this.getChatsByLoggedInUser(this.loggedInMemberUsername);
  }

  sendMessage() {
    this.newChatMessage.message = this.message;
    this.newChatMessage.sender = this.loggedInMemberUsername;
    this.newChatMessage.receiver = this.receiverUsername;
    console.log('this newChatMessage: ', this.newChatMessage);
    this.chatService.saveChat(this.newChatMessage).subscribe(result => {
      this.socketService.emit('send-message', this.newChatMessage);
      this.message = '';
    });
  }

  getChats() {
    this.chatService.getAllChats().subscribe(res => (this.chats = res));
  }

  getChatsByLoggedInUser(loginName) {
    this.chatService
      .getChatByUser(loginName)
      .subscribe(res => (this.chats = res));
  }

  ngOnInit() {
    // this.getChats();
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
    });

    this.LoggedInMemberName = this.authService.getName();
    this.loggedInMemberEmail = this.authService.getEmail();
    this.authService.registrationChanged.subscribe(
      loggedIn => (this.LoggedInMemberName = this.authService.getName())
    );

    this.getChatsByLoggedInUser(this.authService.getName());

    // this.connection =this.chatService.getMessages().subscribe(message => this.messages.push(message));
    this.chats = new Array();
    this.filteredChats = new Array();
    this.socketService.on('message-received', data => {
      this.chats.push(data);
      this.filteredChats = this.filterChat(this.chats);
      console.log(this.filteredChats);

      this.newChats = this.filteredChats.map(c => {
        console.log('uuuu');
        console.log(this.users);
        console.log(c);
        return {
          sender: c.sender,
          message: c.message,
          date: c.date,
          senderName: this.users.find(u => u.email === c.sender).name
        };
      });
    });

    this.userService.getUsers('').subscribe(result => {
      this.users = result;
    });
  }

  ngOnDestroy() {
    // this.connection.unsubscribe();
  }

  showName() {
    this.showSpinner = true;

    setTimeout(() => {
      this.loggedInMemberUsername = this.username;
      this.getChatsByLoggedInUser(this.loggedInMemberUsername);
      this.showSpinner = false;
    }, 2000);
  }
  openChat(selectedMember) {
    // this.saveStatus();
    this.chatOpenned = true;
    this.loggedInMember = selectedMember;
    this.receiverName = selectedMember.name;
    this.receiverUsername = selectedMember.username;
    console.log('Receiver User Name: ', this.receiverUsername);
    console.log('Non filtered chat: ', this.chats);
    this.filteredChats = this.filterChat(this.chats);
    console.log('Out putting filtered chat: ', this.filteredChats);
  }

  filterChat(data) {
    return data.filter(
      e =>
        e.sender === this.receiverUsername ||
        e.receiver === this.receiverUsername
    );
  }
}
