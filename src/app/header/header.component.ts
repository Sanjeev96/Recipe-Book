import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() selectedSection = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSelect(section: string) {
    this.selectedSection.emit(section);
  }

}
