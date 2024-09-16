import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})


export class TempNumberService {
  private tempNum: number = 0;
  private tempNum2: number = 0;
  private tempNum3: number = 0;

  public getTempNum(): number {
    return this.tempNum;
  }

  public setTempNum(): void {
    this.tempNum = Math.floor(Math.random() * 12);
  }


  public getTempNum2(): number {
    return this.tempNum2;
  }

  public setTempNum2(): void {
    this.tempNum2 = Math.floor(Math.random() * 10);
  }


  public getTempNum3(): number {
    return this.tempNum3;
  }

  public setTempNum3(): void {
    this.tempNum3 = Math.floor(Math.random() * 2);
  }
}