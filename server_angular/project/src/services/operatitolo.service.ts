import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperatitoloService {

  constructor(private http: HttpClient) { }
  
  getdata() {
    return this.http.get('https://3245-lukebasco121-pyangboot2-1gkb14v78nt.ws-eu84.gitpod.io/api/opera_titolo')
  }
}
