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

      this.isLoading = true;
    this.authService.SendSignUp(email, password).subscribe(resData => {
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);

  },
      error => {
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
        this.errorMessage = error.error.error.message;
      });
    }

  }

  sendPostError() {
    this.errorMessage = null;
  }
}
