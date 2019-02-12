import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var jquery:any;
declare var $ :any;

import { LoginService } from "../../services/login.service";
import { DataService } from "../../services/data.service";

import {getOrigin} from '../../origin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  origin = getOrigin();

  showError:Boolean = false;
  loginError:String;
  showFooter:Boolean = true;
  showHeader:Boolean = true;
  showSignupError:Boolean = false;
  signUperror:String = ''
  state:any = {
    signup: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      type: 'union'
    },
    login: {
      email: '',
      password: ''
    },
    forgotPassword: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  }


  constructor(
    private router: Router, 
    private http: HttpClient, 
    private dataService: DataService, 
    private loginService: LoginService ) { }

  ngOnInit() {
    $('#loader').removeClass("hide");
    var token = window.localStorage.getItem('token');
    if (token != null) {
      this.dataService.verifyUser(token).subscribe((res) => {
        if (res.success) {
          if (res.user.type == 'promoter' || res.user.type =='artist') {
            // if profile is approved for promoter or artist by admin
            // they will be redirected towards the view
            if (res.user.profile_approved) {
              $('#loader').addClass("hide");
              this.router.navigate(['promoter']);

            } else {
              alert(
                'Admin will allow your login after reviewing your profile.'
              )
            }
          }
          // if user is agent or union
          else if (res.user.type == 'agent' || res.user.type == 'union') {
            // if profile is approved for agent or union by admin
            // they will be redirected towards the view
            if (res.user.profile_approved) {
              $('#loader').addClass("hide");
              this.router.navigate(['admin'])
            } else {
              alert("account not approved");
            }
          } else if (res.user.type == 'admin') {
            $('#loader').removeClass("hide");
            this.router.navigate(['admin']);
          }
        } else {
          alert("Page origin changed to "+this.origin+". Site will be reloaded");
          localStorage.clear();
          window.location.reload();
        }
      });
    } else {
      localStorage.clear();
      $('#loader').addClass("hide");
    }
  }


  forgotPassword() {
    this.router.navigate(['forgot-password']);
  }
  
 
  localLogin () {
    if (this.state.login.email.trim() == "") {
      this.showError = true;
      this.loginError = "Email cannot be empty";
      return;
    }
    if (this.state.login.password.trim() == "") {
      this.showError = true;
      this.loginError = "Password cannot be empty";
      return;
    }

    this.showError = false;
    
    this.loginService.loginUser(this.state.login).subscribe((res) => {
      if(res.success){
        if(!res.data.accountActivated.isTrue){
          alert("Account not activated. Please check your mail to confirm account.")
          this.showError = true;
          this.loginError = "Account not activated.";
        }else{
          if (res.data.type == 'promoter' || res.data.type =='artist' || res.data.type == "") {
            if (res.data.profile_approved) {
              alert("Sorry! Your account cannot be logged from this website. You will be redirect to lyve.fm")
              window.location.href = "https://lyve.fm/";
            } else {
              alert(
                'Admin will allow your login after reviewing your profile.'
              )
            }
          }
          // if user is agent or union
          else if (res.data.type == 'agent' || res.data.type == 'union') {
            // if profile is approved for agent or union by admin
            // they will be redirected towards the view
            if (res.data.profile_approved) {
              localStorage.setItem('token', res.token);
              this.router.navigate(['admin'])
            } else {
              alert("account not approved");
            }
          } else if (res.data.type == 'admin') {
            localStorage.setItem('token', res.token);
            this.router.navigate(['admin']);
          }
        }
      }else{
        this.showError = true;
        this.loginError = res.message;
      }

    })
  }

  signup() {
    if (this.state.signup.firstName.trim() == "") {
      this.showSignupError = true;
      this.signUperror = "First Name cannot be empty";
      return;
    }
    if (this.state.signup.lastName.trim() == "") {
      this.showSignupError = true;
      this.signUperror = "Last Name cannot be empty";
      return;
    }
    if (this.state.signup.email.trim() == "") {
      this.showSignupError = true;
      this.signUperror = "Email cannot be empty";
      return;
    }
    if (this.state.signup.password.trim() == "") {
      this.showSignupError = true;
      this.signUperror = "Password Name cannot be empty";
      return;
    }

    this.showSignupError = false;
   

    this.loginService.signUpUser(this.state.signup).subscribe((res)=>{
      if(!res.success){
        this.showSignupError = true;
        this.signUperror = res.message;
      }else{
        alert(res.message);
      }
    });
  }
}
