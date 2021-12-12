import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  template: `
    <div class="container">
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div class="form-text">Create your account.</div>
        <div class="form-group">
          <input
            type="text"
            class="form-control mg-r-10"
            id="firstName"
            aria-describedby="firstNameHelp"
            placeholder="First Name"
            formControlName="first_name"
          />
          <input
            type="text"
            class="form-control"
            id="lastName"
            aria-describedby="lastNameHelp"
            placeholder="Last Name"
            formControlName="last_name"
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            class="form-control mg-r-10"
            id="email"
            placeholder="Email"
            formControlName="email"
          />
          <input
            type="email"
            class="form-control"
            id="avatar"
            placeholder="Avatar URL"
            formControlName="avatar"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  `,
  styles: [
    `
      .container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30vw;
      }

      @media screen and (max-width: 900px) and (min-width: 300px) {
        form {
          width: 84% !important;
          margin-top: 90px;
        }
      }

      form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 500px;
        background-color: white;
        padding: 20px;
      }

      .form-group {
        display: flex;
      }

      .form-text {
        color: #999797;
        text-align: center;
      }

      input {
        padding: 10px;
        margin: 10px 0;
        width: 100%;
        border-radius: 2px;
        border: 1px solid #ccc;
      }

      input::placeholder {
        color: #a9a9a9;
      }

      button {
        padding: 10px;
        font-weight: bold;
      }

      .mg-r-10 {
        margin-right: 10px;
      }
    `,
  ],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    avatar: new FormControl(''),
  });

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.log(this.signupForm.value);
    this.userService
      .createUser(this.signupForm.value)
      .subscribe((data: any) => {
        data && this.router.navigateByUrl('/users');
      });
  }
}
