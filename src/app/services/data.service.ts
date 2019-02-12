import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getOrigin } from '../origin';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  origin = getOrigin();

  constructor(public http:HttpClient) {

  }
  
  verifyUser(id: String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+"/api/userSession/verify/?token="+id, {
      headers: headers
    });
  }
  logout(id: String):Observable<any>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');
    return this.http.get(this.origin+"/api/userSession/logout/?token="+id, {
      headers: headers
    });
  }

}
