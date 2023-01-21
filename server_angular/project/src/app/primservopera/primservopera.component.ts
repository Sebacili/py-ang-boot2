import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { dataprimservopera } from 'src/models/dataprimservopera.model';


// importare questo
import { PrimservoperaService } from 'src/services/primservopera.service';

@Component({
  selector: 'app-primservopera',
  templateUrl: './primservopera.component.html',
  styleUrls: ['./primservopera.component.css']
})
export class PrimservoperaComponent implements OnInit{


  dati: dataprimservopera[] = [];
  tecnica: string ='';
  // save value
  onClick(t: HTMLInputElement ) 
  {
    this.tecnica = (t.value);
    this.sendData(this.tecnica);
    return false;
  }

  sendData(tecnica: string) { let body: HttpParams = new HttpParams().appendAll({tecnica : tecnica})
    this.http.post<dataprimservopera[]>('https://3245-lukebasco121-pyangboot2-iflf8mih949.ws-eu83.gitpod.io/api/tecnica_museo','',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => this.dati = data);
  }
  
//////////////
  //PrimservoperaService: PrimservoperaService
  constructor(private PrimservoperaService: PrimservoperaService, private http: HttpClient, private fb: FormBuilder, private router: Router) {
   }
   // per prendere i dati da py
  mydata: any;
  ngOnInit(): void {
    this.PrimservoperaService.getdata().pipe(take(1)).subscribe((data: any) => {
      this.mydata = data;
    });
    
    // this.form = this.fb.group({
    //   tecnica: ["", [Validators.required]]
    // });
  }
//////////////


}
