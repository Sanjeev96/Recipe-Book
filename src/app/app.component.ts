import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShoppingCookingApp';

  public onSelectedSection:string;

  onSectionSelect(section: string) {
     this.onSelectedSection = section;
//     console.log(this.onSelectedSection, section);
  }
}
