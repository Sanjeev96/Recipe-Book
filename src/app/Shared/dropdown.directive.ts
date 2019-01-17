import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  
  @HostBinding('class.open') public isOpen: boolean = false;
  constructor() { }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    console.log('click', this.isOpen);

  }
}
