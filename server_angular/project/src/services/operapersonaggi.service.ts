import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperapersonaggiService {

  constructor(private http: HttpClient) { }
  
  getdata() {
    return this.http.get('https://3245-lukebasco121-pyangboot2-iflf8mih949.ws-eu83.gitpod.io/api/opera_personaggi')
  }

}
