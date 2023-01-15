import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class TempNumberService {
  public tempNum: number = 0;

  constructor(private tempNumberService: TempNumberService) {
    this.tempNum = this.tempNumberService.getTempNum();
  }

  public getTempNum(): number {
    return this.tempNum;
  }

  public setTempNum(): void {
    this.tempNum = Math.floor(Math.random() * 21);
  }
}