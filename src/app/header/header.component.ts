import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from '../Shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public from_firstNestApi_forename: string;
  public from_firstNestApi_surname: string;

  constructor(private htttp: HttpClient, private dataStorageService: DataStorageService) {}

  ngOnInit() {
    // this.htttp.get('http://localhost:3000/posts').subscribe(data => {
    //   this.from_firstNestApi_forename = data[0]['forename'];
    //   this.from_firstNestApi_surname = data[1]['surname'];
    // });
  }

  onPostRecipes() {
    this.dataStorageService.saveRecipes();
  }

  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe(); 
    // dont need to pass method in subscribe because we are not bothered about response value, just need to sub for get Req to work
  }
}
