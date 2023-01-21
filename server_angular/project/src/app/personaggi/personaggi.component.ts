
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { datapersonaggi } from 'src/models/datapersonaggi.model';
import { personaggiService } from 'src/services/personaggi.service';

@Component({
  selector: 'app-personaggi',
  templateUrl: './personaggi.component.html',
  styleUrls: ['./personaggi.component.css']
})
export class PersonaggiComponent implements OnInit{
  dati: datapersonaggi[] = [];
  personaggi: string ='';
  // save value
  onClick(t: HTMLInputElement ) 
  {
    this.personaggi = (t.value);
    this.sendData(this.personaggi);
    return false;
  }

  sendData(tecnica: string) { let body: HttpParams = new HttpParams().appendAll({tecnica : tecnica})
    this.http.post<datapersonaggi[]>('https://3245-lukebasco121-pyangboot2-iflf8mih949.ws-eu83.gitpod.io/api/tecnica_museo','',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => this.dati = data);
  }
  
//////////////
  //PrimservoperaService: PrimservoperaService
  constructor(private personaggiService: personaggiService, private http: HttpClient, private fb: FormBuilder, private router: Router) {
   }
   // per prendere i dati da py
  mydata: any;
  ngOnInit(): void {
    this.personaggiService.getdata().pipe(take(1)).subscribe((data: any) => {
      this.mydata = data;
    });
    
    // this.form = this.fb.group({
    //   tecnica: ["", [Validators.required]]
    // });
  }
//////////////


}


