import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserService } from './user.service';

@Injectable()
export class ChatService {

  url: string;

  constructor( private http: Http, private userService : UserService) {
    this.url = 'http://localhost:8000';
   }
  
  getAllChats(){
    return this.http.get(this.url + '/chats')
        .map(res => res.json());
  }

  getChatByRoom(room) {
    return this.http.get(this.url + '/chat/' + room)
        .map(res => res.json())
  }

  getChatByUser(memberUsername) {
    return this.http.get(this.url + '/chats/' + memberUsername)
          .map(res => res.json());
  }

  saveChat(data) {
    return this.http.post(this.url + '/chats', data)
    .map(res => res.json());
  }

  updateChat(id, data) {
    return new Promise((resolve, reject) => {
        this.http.put(this.url + '/chat/'+id, data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

  saveStatus(data){
    return this.http.post(this.url + '/chats/status', data)
    .map(res => res.json());
  }

  deleteChat(id) {
    return new Promise((resolve, reject) => {
        this.http.delete('/chat/'+id)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}
