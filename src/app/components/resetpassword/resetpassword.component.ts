import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { ActivatedRoute, Router } from "@angular/router";

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  showError: Boolean;
  ErrorMessage: String;
  state:any = {
    forgotPassword: {
      password: '',
      confirmPassword: ""
    }
  }

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    $('#loader').addClass("hide");
  }

  resetPassword(){
    if(this.state.forgotPassword.password != this.state.forgotPassword.confirmPassword){
      this.showError = false;
      this.ErrorMessage = "Password don't match"
      return;
    }
    if(this.state.forgotPassword.password.trim == ""){
      this.showError = false;
      this.ErrorMessage = "Password field cannot be empty"
      return;
    }
    if(this.state.forgotPassword.confirmPassword.trim == ""){
      this.showError = false;
      this.ErrorMessage = "Confirm Password field cannot be empty"
      return;
    }
    this.route.params.subscribe(params => {
      this.loginService.resetPassword(params.token, this.state.forgotPassword.password).subscribe((res)=>{
        if(!res.success){
          this.showError = true;
          this.ErrorMessage = res.message;
          return;
        }else{
          alert("Your password has been resetted");
          this.router.navigate(['']);
        }
      })  
    });
    
  }

}
