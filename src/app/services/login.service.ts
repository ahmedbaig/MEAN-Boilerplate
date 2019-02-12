import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getOrigin } from '../origin';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  origin = getOrigin();

  constructor(public http:HttpClient) {

  }
  
  loginUser(user: any):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    // const query = "{user: {email: "+email+", password: "+password+"}}"
    var queryStr = {user: user};
    return this.http.post(this.origin+"/api/user/login-user", queryStr, {
      headers: headers
    });
  }

  signUpUser(user: any):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    // const query = "{user: {email: "+email+", password: "+password+"}}"
    var queryStr = {user: user};
    return this.http.post(this.origin+"/api/user/new-user-signup", queryStr, {
      headers: headers
    });
  }

  forgotPassword(email: any):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    // const query = "{user: {email: "+email+", password: "+password+"}}"
    var queryStr = {email: email};
    return this.http.post(this.origin+"/api/user/send-forgot-password-email", queryStr, {
      headers: headers
    });
  }

  resetPassword(token: any, password: any):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    var queryStr = {password: password};
    return this.http.post(this.origin+"/api/user/reset-password/"+token, queryStr, {
      headers: headers
    });
  }

  activateAccount(token: any):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+"/api/user/activate-account/"+token, {
      headers: headers
    });
  }
}
