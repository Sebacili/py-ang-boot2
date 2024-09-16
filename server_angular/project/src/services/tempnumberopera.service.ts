import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempnumberoperaService {

  constructor() { }

  private tempNumOpera: number = 0;

  public setTempNumOpera(): void {
    this.tempNumOpera = Math.floor(Math.random() * 12);
  }

  public getTempNumOpera(): number {
    return this.tempNumOpera;
  }

}

