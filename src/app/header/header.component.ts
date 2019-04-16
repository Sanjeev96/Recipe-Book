import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public from_firstNestApi_forename: string;
  public from_firstNestApi_surname: string;

  constructor(private htttp: HttpClient) {}

  ngOnInit() {
    this.htttp.get('http://localhost:3000/posts').subscribe(data => {
      this.from_firstNestApi_forename = data[0]['forename'];
      this.from_firstNestApi_surname = data[1]['surname'];
    });
  }
}
