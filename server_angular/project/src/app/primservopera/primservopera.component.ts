import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-primservopera',
  templateUrl: './primservopera.component.html',
  styleUrls: ['./primservopera.component.css']
})
export class PrimservoperaComponent {


  staffs!: any;
  loading!: Boolean;
  url: string = "http://localhost:3245/api/musei";

  constructor(public http: HttpClient) {
    this.get(this.url);
  }

  get(url: string): void {
    this.loading = true;
    this.http.get(url).subscribe(data => {
      this.staffs = data;
      this.loading = false;
    });
  }

  // previousSearch: string = '';
  // onKey(value: string) {
  //   if (value != this.previousSearch) {
  //     this.get(this.url + "?store_name=" + value);
  //     this.previousSearch = value;
  //   }
  // }

  onKey(value: string) {
    this.get(this.url + "?store_name=" + value);
  }

}
