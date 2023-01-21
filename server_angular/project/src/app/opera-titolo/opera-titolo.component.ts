import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { dataoperatitolo } from 'src/models/dataoperatitolo.model';

// importare questo
import { OperatitoloService } from 'src/services/operatitolo.service';
@Component({
  selector: 'app-opera-titolo',
  templateUrl: './opera-titolo.component.html',
  styleUrls: ['./opera-titolo.component.css']
})
export class OperaTitoloComponent implements OnInit{

  dati: dataoperatitolo[] = [];
  titolo: string ='';
  // save value
  onClick(t: HTMLInputElement ) 
  {
    this.titolo = (t.value);
    this.sendData(this.titolo);
    return false;
  }

  sendData(titolo: string) { let body: HttpParams = new HttpParams().appendAll({titolo : titolo})
    this.http.post<dataoperatitolo[]>('https://3245-lukebasco121-pyangboot2-iflf8mih949.ws-eu83.gitpod.io/api/opera_titolo','',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => this.dati = data);
  }
  
//////////////
  //PrimservoperaService: PrimservoperaService
  constructor(private OperatitoloService: OperatitoloService, private http: HttpClient, private fb: FormBuilder, private router: Router) {
   }
   // per prendere i dati da py
  mydata: any;
  ngOnInit(): void {
    this.OperatitoloService.getdata().pipe(take(1)).subscribe((data: any) => {
      this.mydata = data;
    });
    
    // this.form = this.fb.group({
    //   tecnica: ["", [Validators.required]]
    // });
  }
  //////////////
}
