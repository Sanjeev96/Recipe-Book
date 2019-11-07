import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService, AuthResponseData } from './authentication.service';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';

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


  constructor(private authService: AuthenticationService, private router: Router) {

   }

  ngOnInit() {}

  public networkStatus() {
    this.online$.subscribe(value => {
      this.connection = `${value}`;
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

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.logginMode) {
       authObs = this.authService.Login(email, password);

    } else {
      authObs =  this.authService.SendSignUp(email, password);
    }

    // Call methods above then do subscription seeing as the process is the same
    this.isLoading = true;
    authObs.subscribe(resData => {
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/recipe-book']);
      }, 2000);
    },
    errorMessage => {
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
      this.errorMessage = errorMessage;
    });
  }

  handleError() {
    this.errorMessage = null;
  }

  sendPostError() {
    this.errorMessage = null;
  }

  CheckConnection() {
    this.connection = null;
  }
}
