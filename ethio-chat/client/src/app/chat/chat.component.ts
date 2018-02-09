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
<<<<<<< HEAD
  loggedInMemberEmail = '';
=======
  LoggedInMemberName = '';
>>>>>>> 30762858fd1a1553f4c7ab5fe08e8cfb9ab7db74
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
    public authService: AuthService,
    private socketService: SocketService,
    private userService: UserService
  ) {
<<<<<<< HEAD
    authService.handleAuthentication();
=======
    // this.getChats();
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
    });

    this.loggedInMemberUsername = this.authService.getEmail();
    this.LoggedInMemberName = this.authService.getName();
    this.getChatsByLoggedInUser(this.loggedInMemberUsername);
>>>>>>> 30762858fd1a1553f4c7ab5fe08e8cfb9ab7db74
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
    // this.getChats();
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
    });

    this.loggedInMemberUsername = this.authService.getName();
    this.loggedInMemberEmail = this.authService.getEmail();
    this.authService.registrationChanged.subscribe(
      loggedIn => (this.loggedInMemberUsername = this.authService.getName())
    );

    this.getChatsByLoggedInUser(this.authService.getName());

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
<<<<<<< HEAD
    // this.chats.filter(e => e.sender == this.receiverName ||  e.receiver == this.receiverName)//
    //  console.log('filteres ', this.filteredChats);
=======
    console.log("Out putting filtered chat: ", this.filteredChats)
>>>>>>> 30762858fd1a1553f4c7ab5fe08e8cfb9ab7db74
  }

  filterChat(data) {
    return data.filter(
      e => e.sender == this.receiverUsername || e.receiver == this.receiverUsername
    );
  }
}
