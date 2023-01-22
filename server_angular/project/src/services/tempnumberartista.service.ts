import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TempnumberartistaService {

  constructor() { }

  private tempNumArtista: number = 0;
  private tempNumMuseo: number = 0;

  public setTempNumArtista(): void {
    this.tempNumArtista = Math.floor(Math.random() * 10);
  }
  public getTempNumArtista(): number {
    return this.tempNumArtista;
  }

  public setTempNumMuseo(): void {
    this.tempNumMuseo = Math.floor(Math.random() * 10);
  }
  public getTempNumMuseo(): number {
    return this.tempNumMuseo;
  }

}
