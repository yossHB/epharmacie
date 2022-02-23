import { Component, OnInit } from '@angular/core';
import { NgForm,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.login();
  }
  
  /*user = {
    "username":"user88",
    "password":"1234","confirmedPassword":"1234"
  }*/
  login() : void {
    const { username, password} = this.form;
    console.log(username,password);
    this.userService.login(username,password).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        console.log(response);

        const role = response.user.role[0].roleName;
        if (role === 'ADMIN') {
          this.router.navigate(['https://www.youtube.com/watch?v=1GUsmQKMnuU']);
        } else {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
