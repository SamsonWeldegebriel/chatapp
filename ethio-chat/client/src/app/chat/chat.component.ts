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
  LoggedInMemberName = '';
  showSpinner = false;
  chatOpenned = false;
  receiverName = '';
  receiverUsername = '';
  loggedInMember: {};

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

  filteredChats = [];
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private socketService: SocketService,
    private userService: UserService
  ) {
    // this.getChats();
    this.userService.getAllUsers().subscribe(res => {
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
    this.chatService.saveChat(this.newChatMessage).subscribe(result => {
      this.socketService.emit('send-message', this.newChatMessage);
      this.message = '';
    });
  }

  // saveStatus(){
  //   this.newChatMessage.message = this.message;
  //   this.newChatMessage.sender = this.loggedInMemberUsername;
  //   this.newChatMessage.receiver = this.receiverName;
  //   this.newChatMessage.status = true;
  //   this.chatService.saveChat(this.newChatMessage).subscribe((result) => {
  //     this.socketService.emit('send-message', this.newChatMessage);
  //     this.message = '';
  //     this.newChatMessage.status= false;
  //   })
  // }

  /*
     sendMessage(){
    const msg = {
      text: this.message
    }
    this.socketService.emit('send-message', msg);
    this.message ='';
  }
  */

  getChats() {
    this.chatService.getAllChats().subscribe(res => (this.chats = res));
  }

  getChatsByLoggedInUser(loginName) {
    this.chatService
      .getChatByUser(loginName)
      .subscribe(res => (this.chats = res));
  }

  ngOnInit() {
    // this.connection =this.chatService.getMessages().subscribe(message => this.messages.push(message));
    this.chats = new Array();
    this.filteredChats = new Array();
    this.socketService.on('message-received', data => {
      this.chats.push(data);
      this.filteredChats = this.filterChat(this.chats);
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
    console.log("Receiver User Name: ", this.receiverUsername);
    console.log("Non filtered chat: ", this.chats);
    this.filteredChats = this.filterChat(this.chats);
    console.log("Out putting filtered chat: ", this.filteredChats)
  }

  filterChat(data) {
    return data.filter(
      e => e.sender == this.receiverUsername || e.receiver == this.receiverUsername
    );
  }
}
