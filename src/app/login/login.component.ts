import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {FormControlValidationDirective} from "../form-control-validation.directive";
import {FormLabelDirective} from "../form-label.directive";
import {FormLabelValidationDirective} from "../form-label-validation.directive";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'pr-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormControlValidationDirective, FormLabelDirective, FormLabelValidationDirective, NgbAlert],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginCtrl = this.fb.control('', Validators.required);
  passwordCtrl = this.fb.control('', Validators.required);
  credentials = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });
  authenticationFailed = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  authenticate(): void {
    this.authenticationFailed = false;
    const { login, password } = this.credentials.value;

    this.userService.authenticate(login, password).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: () => (this.authenticationFailed = true)
    });
  }
}
