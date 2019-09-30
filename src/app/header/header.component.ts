import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../Shared/data-storage.service';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { Subscription, empty } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public from_firstNestApi_forename: string;
  public from_firstNestApi_surname: string;
  userSub: Subscription;
  isLoggedIn: boolean;

  constructor(
    private htttp: HttpClient,
    private dataStorageService: DataStorageService,
    private authService: AuthenticationService
    ) {}

  ngOnInit() {
    // this.htttp.get('http://localhost:3000/posts').subscribe(data => {
    //   this.from_firstNestApi_forename = data[0]['forename'];
    //   this.from_firstNestApi_surname = data[1]['surname'];
    // });

    this.userSub = this.authService.user.subscribe(user => {
      // if (user != null ) {
      //   this.isLoggedIn = true;
      // } else {
      //   this.isLoggedIn = false;
      // }
      // SHORT HAND OF ABOVE below
      this.isLoggedIn = user ? true : false;
      console.log('user = ', user);
      console.log('null user =', !user);


    });
  }

  onPostRecipes() {
    this.dataStorageService.saveRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
    // dont need to pass method in subscribe because we are not bothered about response value, just need to sub for get Req to work
  }

  onLogout() {
  this.userSub.unsubscribe();
  }

  OnDestroy() {
  this.onLogout();
  }
}
