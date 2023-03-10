import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AuthenticationUser } from 'src/app/shared/interfaces/user/authenticationUser'
import { AuthResponse } from 'src/app/shared/interfaces/response/authResponse';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private returnUrl: string;

  loginForm: FormGroup;
  errorMessage: string = '';
  showError: boolean;

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName)?.hasError(errorName)
  }

  loginUser = (loginFormValue: any) => {
    this.showError = false;
    const login = {... loginFormValue };

    const authUser: AuthenticationUser = {
      email: login.username,
      password: login.password
    }

    this.authService.loginUser('api/accounts/login', authUser)
    .subscribe({
      next: (res: AuthResponse) => {
        localStorage.setItem("token", res.token);
        this.authService.sendAuthStateChangeNotification(res.isSuccessful);
        this.router.navigate([this.returnUrl]);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
  }

}
