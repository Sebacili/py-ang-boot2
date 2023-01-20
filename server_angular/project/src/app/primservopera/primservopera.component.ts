import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { Observable } from 'rxjs';

// importare questo
import { PrimservoperaService } from 'src/services/primservopera.service';

@Component({
  selector: 'app-primservopera',
  templateUrl: './primservopera.component.html',
  styleUrls: ['./primservopera.component.css']
})
export class PrimservoperaComponent implements OnInit{

  form!: FormGroup;
  errorMessage!: string;
//////////////
  //PrimservoperaService: PrimservoperaService
  constructor(private PrimservoperaService: PrimservoperaService, private http: HttpClient, private fb: FormBuilder, private router: Router) {
   }
   // per prendere i dati da py
  mydata: any;
  ngOnInit(): void {
    this.PrimservoperaService.getdata().subscribe((data: any) => {
      this.mydata = data;
    });
    
    this.form = this.fb.group({
      tecnica: ["", [Validators.required]]
    });
  }
//////////////


  url : string = 'https://3245-lukebasco121-pyangboot2-iflf8mih949.ws-eu83.gitpod.io/api/tecnica_museo';
  submit() {
    let body: HttpParams = new HttpParams();
    body = body.appendAll({
      tecnica: this.form.value.tecnica
    });

    this.http.post<Data>(this.url, '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => {
      console.log(data['data']);

      if(data['url'] != null) {
        this.router.navigate([data['url']]);
      } else {
        this.errorMessage = data['data'];
      }
    })
  }





}
