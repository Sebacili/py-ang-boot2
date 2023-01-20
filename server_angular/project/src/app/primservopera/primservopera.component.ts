import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { dataprimservopera } from 'src/models/dataprimservopera.model';

@Component({
  selector: 'app-primservopera',
  templateUrl: './primservopera.component.html',
  styleUrls: ['./primservopera.component.css']
})
export class PrimservoperaComponent implements OnInit{
  


  idk!: any;
  url: string = "https://3245-lukebasco121-pyangboot2-vyccinqvxv1.ws-eu83.gitpod.io";

  constructor(public http: HttpClient) {
    // this.get(this.url);
    this.makeRequest(this.url + "/api/tecnica_museo");
   }

   makeRequest(url :string): void {
    this.http.get(this.url).subscribe(data => {
      this.idk = data;
    })
  }


  // getData = (d: Object) => {
  //   this.data = d;
  // }





  ngOnInit(): void {
  }


  // citta !: any;
  // nome !: any;
  // paese!: any;
  // tot_opere !: any;


  // get(url: string):void {
  //   this.http.get(url).subscribe(res => {
  //     console.log(res)
  //     this.citta = res;
  //     this.nome = res;
  //     this.paese = res;
  //     this.tot_opere = res;
  //   });
    
  // }




  // makeCompactRequest(): void {
  //   this.loading = true;
  //   this.http
  //     .get('https://jsonplaceholder.typicode.com/posts/1')
  //     .subscribe(data => {
  //       this.data = data;
  //       this.loading = false;
  //     });
  // }
  

  // previousSearch: string = '';
  // onKey(value: string) {
  //   if (value != this.previousSearch) {
  //     this.get(this.url + "?store_name=" + value);
  //     this.previousSearch = value;
  //   }
  // }

  // onKey(value: string) {
  //   this.get(this.url + "?store_name=" + value);
  // }

}
