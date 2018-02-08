import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable()
export class GroupServiceService {
  groups;
  constructor(public http: HttpClient) {}

  getAllGroup() {
    console.log('Called');
    return this.http.get('http://localhost:8000/groups');
  }

  getGroupByName(name) {
    console.log('group by name method called   : ' + name);
    return this.http.get('http://localhost:8000/groups/' + name);
  }

  members(groupname) {
    return this.http.get(
      'http://localhost:8000/groups/:' + groupname + '/users'
    );
  }
  joinGroup(groupname, user) {
    console.log('User Join the group');
    return this.http.put(
      'http://localhost:8000/groups/' + groupname + '/users',
      user
    );
  }

  add(group) {
    console.log('User Join the group');
    return this.http.post('http://localhost:8000/groups/', group);
  }

  delete(name) {
    console.log('User Deleted the group');
    return this.http.delete('http://localhost:8000/groups/' + name);
  }
}
