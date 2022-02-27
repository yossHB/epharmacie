import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserAuthService } from './user-auth.service';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //[x: string]: any;
  PATH_OF_API = 'http://localhost:8080';
  private currentUserSubject: BehaviorSubject<JwtResponse>;
  public currentUser: Observable<JwtResponse>;
  public nameTerms = new Subject<string>();
  public name$ = this.nameTerms.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private userAuthService: UserAuthService,
    private cookieService: CookieService
  ) {
    const memo = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(memo));
    this.currentUser = this.currentUserSubject.asObservable();
    cookieService.set('currentUser', memo);
  }
  get currentUserValue() {
    return this.currentUserSubject.value;
}


  login(loginForm): Observable<JwtResponse> {
    const url = `${this.PATH_OF_API}/login`;
    
    return this.http.post<JwtResponse>(url, loginForm,this.httpOptions).pipe(
        tap(user => {
            if (user && user.token) {
                this.cookieService.set('currentUser', JSON.stringify(user));
                if (loginForm.remembered) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                console.log((user.token));
                this.nameTerms.next(user.name);
                this.currentUserSubject.next(user);
                return user;
            }
        }),
        catchError(this.handleError('Login Failed', null))
    );
}

  register(username,password,confirmedPassword): Observable<Object>  {
    //registerData={"username":"admin","password":"1234"};
    //console.log(registerData);
    return this.http.post(`${this.PATH_OF_API}/register`, {
      username,
      password,confirmedPassword
    },this.httpOptions);
  }

  public forUser() {
    return this.http.get(this.PATH_OF_API + '/appUsers', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.http.get(this.PATH_OF_API + '/appUsers', {
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
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

        console.log(error); // log to console instead

        // Let the app keep running by returning an empty result.
        return of(result as T);
    };
}
}

export class JwtResponse {
  token: string;
  type: string;
  account: string;
  name: string;
  role: string;

}
