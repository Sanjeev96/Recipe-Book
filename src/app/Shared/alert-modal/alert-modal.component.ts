import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  constructor() { }
  @Input() message: string;
  @Output() close = new EventEmitter();

  ngOnInit() {
  }

  CloseModal() {
    this.close.emit();
  }

}
