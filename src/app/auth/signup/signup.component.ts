import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'll-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    confirmedPassword:null
  };
  isSuccessful = true;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    const { username, password,confirmedPassword } = this.form;


    this.userService.register(username,password,confirmedPassword).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/auth/login']);
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isSignUpFailed = true;
      }
    );
  }

}
