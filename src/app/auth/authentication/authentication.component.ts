import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

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
  online$: Observable<boolean>;
  connection: any;


  constructor(private authService: AuthenticationService) {

   }

  ngOnInit() {}

  public networkStatus() {
    this.online$.subscribe(value => {
      this.connection = `${value}`;
      console.log(this.connection);
    });
  }

  onSwitchMode() {
    this.logginMode = !this.logginMode; // reverses value to oppisite of what it currenlty is
  }

  onSubmit(form: NgForm) {

    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
    this.networkStatus();

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
        switch (error.error.error.message) {
          case 'EMAIL_EXISTS':
          this.errorMessage = 'Email already exists!';
          break;
          default:
            this.errorMessage = 'Unkown Error';
        }
      });
    }

  }

  sendPostError() {
    this.errorMessage = null;
  }

  CheckConnection() {
    this.connection = null;
  }
}
