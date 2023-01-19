import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { dynamichomeopera } from 'src/models/dynamichomeopera.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isShow = false;

  operedata : dynamichomeopera[] | undefined;
  data: Object | undefined;
  loading: boolean | undefined;
  o: Observable<Object> | undefined;
  obsoperedata : Observable<dynamichomeopera[]> | undefined;

  
  constructor(public http: HttpClient) { }


  //Nota bene, questo è un metodo alternativo al metodo makeRequest
  makeCompactRequest(): void {
    this.loading = true;
    this.http
      .get('https://3245-lukebasco121-pyangboot2-0fwxiji06fr.ws-eu83.gitpod.io/api/dynamicHome')
      .subscribe(data => {
        this.data = data;
        this.loading = false;
      });
  }


  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  ngOnInit(): void {
  }

}
