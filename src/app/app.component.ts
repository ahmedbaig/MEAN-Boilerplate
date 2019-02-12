import { Component,ViewEncapsulation } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private AuthService:DataService){}

  ngOnInit(): void {
  //   var session_token;
  //   if(localStorage.getItem('session_token')){
  //     session_token = localStorage.getItem('session_token');
  //     this.AuthService.verifyUser(session_token).subscribe(async (res) => {
  //       //console.log(res);
  //       if(!res.success){ //denied access
  //         localStorage.removeItem('session_token');
  //         localStorage.removeItem('token');
  //         location.pathname = "/"; 
  //       }
  //     })
  //   }else{ //no session
  //     localStorage.removeItem('session_token');
  //     localStorage.removeItem('token');
  //     location.pathname = "/"; 
  //   }
  }
}
