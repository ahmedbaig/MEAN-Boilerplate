import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { DataService} from './services/data.service';

import { AppComponent } from './app.component';

import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { AccountactivitionComponent } from './components/accountactivition/accountactivition.component';
const appRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {path: '', component: LoginComponent},
      {path: 'forgot-password', component: ForgotpasswordComponent},
      {path: 'reset-password/:token', component: ResetpasswordComponent},
      {path: 'account-activation/:token', component: AccountactivitionComponent}
    ]
  }
];

const config = {useHash:true};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    AccountactivitionComponent
  ],
  imports: [
    NgbModule,
    LoadingBarHttpClientModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, config)
  ],
  providers: [
    DataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
