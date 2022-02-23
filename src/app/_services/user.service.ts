import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //[x: string]: any;
  PATH_OF_API = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  login(username="user5",password="1234"): Observable<Object>  {
    //console.log(loginData);
    return this.httpclient.post(`${this.PATH_OF_API}/login`, {
      username,
      password
    }, this.httpOptions);
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
