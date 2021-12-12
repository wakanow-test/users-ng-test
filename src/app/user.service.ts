import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Users, User } from './types';

import { data } from './data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: Users = [];
  constructor() {
    const lData = window?.localStorage?.getItem('users') as any;
    const usersD = JSON?.parse(lData);
    if (
      !usersD ||
      !usersD.length ||
      usersD === null ||
      usersD.length <= 0 ||
      usersD === '"null"'
    ) {
      localStorage.setItem('users', JSON.stringify(data));
      this.users = JSON?.parse(localStorage?.getItem('users') as any);
    } else {
      this.users = usersD;
    }
  }

  getUsers(): Observable<any> {
    // return this.http.get('https://reqres.in/api/users');
    return of(this.users);
  }

  getUser(id: number): Observable<any> {
    // return this.http.get(`https://reqres.in/api/users/${id}`);
    return of(this.users.find((user) => +user.id === +id));
  }

  editUser(id: number, _data: User): Observable<any> {
    // return this.http.put(`https://reqres.in/api/users/${id}`, this.users);
    const index = this.users.findIndex((user) => +user.id === +id);
    this.users[index] = { ..._data, id };
    this.saveToStorage();
    return of(this.users[index]);
  }

  createUser(_data: User): Observable<any> {
    // return this.http.post('https://reqres.in/api/users', data);
    const tempData = { ..._data, id: Math.floor(Math.random() * 100) };
    this.users.push(tempData);
    this.saveToStorage();
    return of(tempData);
  }

  deleteUser(id: number): Observable<any> {
    // return this.http.delete(`https://reqres.in/api/users/${id}`);
    const index = this.users.findIndex((user) => +user.id === +id);
    this.users.splice(index, 1);
    this.saveToStorage();
    return of(this.users);
  }

  private saveToStorage() {
    window?.localStorage?.setItem('users', JSON.stringify(this.users));
  }
}
