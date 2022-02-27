import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm,ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import {  UserServices } from 'src/app/_services/user.service';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  isInvalid: boolean;
  isLogout: boolean;
  submitted = false;
  form: any = {
      username: '',
      password: '',
  };
<<<<<<< HEAD
  private subscriptions = new SubSink();
 
  roles: string[] = [];
=======

  returnUrl = '/';          
>>>>>>> 31173c8dc04d88729813b85afc6bb832cdb4db86
  constructor(
    private userServices: UserServices,
    private userAuthService: UserAuthService,
<<<<<<< HEAD
    private router: Router,private tokenStorage: TokenStorageService

=======
    private router: Router,
    private route: ActivatedRoute
>>>>>>> 31173c8dc04d88729813b85afc6bb832cdb4db86

  ) {}

  ngOnInit(): void {
<<<<<<< HEAD

  }
=======
    let params = this.route.snapshot.queryParamMap;
    this.isLogout = params.has('logout');
    this.returnUrl = params.get('returnUrl');
  }
  

  onSubmit() {
    this.submitted = true;
    this.router.navigate(['/']);
    this.userService.login(this.form).subscribe(
        user => {
            if (user) {
              console.log(user);
            this.returnUrl = '/auth/signup';
                

            this.router.navigate(['/']);
          
            } else {
                this.isLogout = false;
                this.isInvalid = true;
            }

        }
    );
}
fillLoginFields(u: any, p: any) {
  this.form.username = u;
  this.form.password = p;
  this.onSubmit();
}
}

/*
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
>>>>>>> 31173c8dc04d88729813b85afc6bb832cdb4db86

  onSubmit(): void {
    const { username, password } = this.form;
    const userForm={"username":this.form.username,"password":this.form.password};

    console.log(userForm);
    this.subscriptions.add(
    this.userServices.login(this.form.username,this.form.password).subscribe(
      (response) => {
        console.log("response = " + response.headers);
        this.tokenStorage.addTokenToCache(response.headers.get('authorization'));
        console.log(response.body.username);
        this.tokenStorage.addUserToCache(response.body);
        this.router.navigateByUrl('/');

      },
      (error: HttpErrorResponse) => {
        alert(error.message);

      }
    ));
  }

}