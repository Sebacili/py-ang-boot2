import { Component, Input } from '@angular/core';
import { TempNumberService } from './temp-number.service';
// import { tempNum } from './temp-number.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';

  isShow = false;
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  @Input() tempNum :  number = 0;


}
