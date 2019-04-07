import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  showError: Boolean;
  ErrorMessage: String;
  state:any = {
    forgotPassword: {
      email: ''
    }
  }

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  sendForgotPasswordEmail(){
    if(this.state.forgotPassword.email.trim == "" ){
      this.showError = true;
      this.ErrorMessage = "email cannot be empty";
      return;
    }
    this.loginService.forgotPassword(this.state.forgotPassword.email).subscribe((res) => {
      if(!res.success){
        this.showError = true;
        this.ErrorMessage = res.message;
      }else{
        alert("Password reset email has been sent to your account");
        this.router.navigate(['']);
      }
    })
  }

}
