import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  //[x: string]: any;
  PATH_OF_API = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService,
    private http: HttpClient
  ) {}
 
  login(username: string,password:string): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.PATH_OF_API}/login`, {username,password}, { observe: 'response'});
  }

  register(username,password,confirmedPassword): Observable<Object>  {
    //registerData={"username":"admin","password":"1234"};
    //console.log(registerData);
    return this.httpclient.post(`${this.PATH_OF_API}/register`, {
      username,
      password,confirmedPassword
    },this.httpOptions);
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/appUsers', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/appUsers', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
