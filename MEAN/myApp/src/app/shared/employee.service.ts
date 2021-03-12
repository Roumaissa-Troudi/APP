import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';

import { Employee } from './employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  selectedEmployee: Employee = {
    fullName: '',
    email: '',
    password: '',
    workStatus: false,
  };



  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  constructor(private http: HttpClient) {
  }

  postEmployee(employee: Employee) {
    return this.http.post(
      environment.apiBaseUrl + '/register',
      employee,
      this.noAuthHeader
    );
  }
  login(authCredentials) {
    return this.http.post(
      environment.apiBaseUrl + '/authenticate',
      authCredentials,
      this.noAuthHeader
    );
  }

  getEmployeeProfile() {
    return this.http.get(environment.apiBaseUrl + '/dashboard');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else return null;
  }
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }

  signOut(): void {
    localStorage.clear();
  }
  getworkvalue() {
    return this.http.get(environment.apiBaseUrl + '/workstatus');
  }
  postWork(value: boolean) {
    return this.http.post(environment.apiBaseUrl + '/work', value);
  }
  setEmployeeInfo(employee: Employee) {
    localStorage.setItem('employee', JSON.stringify(employee));
  }

  getEmployeeInfo() {
    return JSON.parse(localStorage.getItem('employee'));
  }

  searchReplacement() {
    return this.http.get(environment.apiBaseUrl + '/searchReplacement');
  }

  getEmployeeTable() {
    return this.http.get(environment.apiBaseUrl + '/table');
  }
gettableEmployee() {
  return this.http.get(environment.apiBaseUrl + '/employeetable');

}

}
