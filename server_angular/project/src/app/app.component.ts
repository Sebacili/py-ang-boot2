import { Component, Input, OnInit } from '@angular/core';
import { TempNumberService } from './temp-number.service';
// import { tempNum } from './temp-number.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  tempNum :  number = 0;
  tempNum2 :  number = 0;
  tempNum3 :  number = 0;
  title = 'project';
  isShow = false;

  constructor(public randomService : TempNumberService)
  {}
  ngOnInit(): void {
    this.randomService.setTempNum();
    this.tempNum = this.randomService.getTempNum();
    this.randomService.setTempNum2();
    // this.tempNum2 = this.randomService.setTempNum2();
    this.randomService.setTempNum3();
    // this.tempNum3 = this.randomService.setTempNum3();
  }
  





}
