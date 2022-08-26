import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { authService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';


  constructor(
    private userService : UsersService,
    private formBuilder : FormBuilder,
    private authService : authService,
    private localStorageService: LocalstorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.loginFormGroup = this.formBuilder.group({
        email: ['',  Validators.required],
        password: ['',Validators.required]
      });
  }


  get loginForm():any {
      return this.loginFormGroup.controls;
  }


  onSubmit() {

    this.isSubmitted = true;

    if (this.loginFormGroup.invalid) {
      return;
    }

    this.authService.login(this.loginForm.email.value , this.loginForm.password.value)
    .subscribe( user => {
      this.authError = false;
       this.localStorageService.setToken(user.token!);
      console.log(user);
      this.router.navigate(['/dashboard']);
      
      
    },
    (error: HttpErrorResponse) => {
      this.authError = true;
      if (error.status !== 400) {
        this.authMessage = 'Error in the Server, please try again later!';
      }
    });

  }

}
