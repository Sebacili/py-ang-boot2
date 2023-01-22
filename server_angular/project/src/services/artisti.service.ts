import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArtistiService {

  constructor(private http: HttpClient) { }
  
  getdata() {
    return this.http.get('https://3245-lukebasco121-pyangboot2-1gkb14v78nt.ws-eu83.gitpod.io/api/artisti')
  }
}
