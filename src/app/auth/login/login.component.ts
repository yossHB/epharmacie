import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  form: any = {
    username:null,
    password: null
  };
  private subscriptions = new SubSink();
 
  roles: string[] = [];
  constructor(
    private userServices: UserServices,
    private userAuthService: UserAuthService,
    private router: Router,private tokenStorage: TokenStorageService


  ) {}

  ngOnInit(): void {

  }

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