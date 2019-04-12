import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { DataService} from './services/data.service';

import { AppComponent } from './app.component';
const appRoutes: Routes = [
  // {
  //   path: '',
  //   component: AuthComponent,
  //   children: [
  //     {path: '', component: LoginComponent},
  //     {path: 'forgot-password', component: ForgotpasswordComponent},
  //     {path: 'reset-password/:token', component: ResetpasswordComponent},
  //     {path: 'account-activation/:token', component: AccountactivitionComponent}
  //   ]
  // }
];

const config = {useHash:true};

@NgModule({
  declarations: [
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
