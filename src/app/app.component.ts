import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './auth/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ShoppingCookingApp';

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }

}
