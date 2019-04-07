import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";
import { ActivatedRoute, Router } from "@angular/router";
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-accountactivition',
  templateUrl: './accountactivition.component.html',
  styleUrls: ['./accountactivition.component.css']
})
export class AccountactivitionComponent implements OnInit {

  message: String;
  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    $('#loader').addClass("hide");
    this.route.params.subscribe(params => {
      this.loginService.activateAccount(params.token).subscribe((res)=>{
        if(res.success){
          this.message = res.message;
        }
      })  
    });
  }

}
