// author Tigist Damesa ....05/02/2018

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {DataType} from '../type';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<DataType>(
      `${environment.apiRootUrl}/api/users/search/`
    );
  }
  getUser() {
    console.log('users' + 'http://localhost:8000/api/users/');
    return this.http.get<DataType>(
      `${environment.apiRootUrl}/api/users/`
    );
  }
  createUser(user) {
    return this.http.post(`${environment.apiRootUrl}/api/users`, user);
  }
  updateUser(user) {
    return this.http.put(`${environment.apiRootUrl}/api/users`, user);
  }
  getUsers(name) {
    return this.http.get(`${environment.apiRootUrl}/api/users/search/${name}`);
  }
  addJoinedGroup(obj) {
     return this.http.put(`${environment.apiRootUrl}/api/join`, obj);
  }

  getUserGroup() {
    return this.http.get<string[]>(`${environment.apiRootUrl}/api/user/groups`);
 }
}
