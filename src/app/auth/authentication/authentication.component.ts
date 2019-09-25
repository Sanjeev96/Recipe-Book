import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  @ViewChild('authForm') authForm: NgForm;
  logginMode = true;
  errorMessage: string;
  isLoading: boolean;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.logginMode = !this.logginMode; // reverses value to oppisite of what it currenlty is
  }

  onSubmit(form: NgForm) {

    if (this.logginMode) {
      alert('not set up yet');
    } else {
    const email = form.value.email;
    const password = form.value.password;

    setTimeout(() => {
      this.isLoading = true;
    this.authService.SendSignUp(email, password).subscribe(resData => {
      this.isLoading = false;

  },
      error => {
        this.isLoading = false;
        this.errorMessage = error.error.error.message;
      });
    }, 1500);
    }

  }

  sendPostError() {
    this.errorMessage = null;
  }
}
