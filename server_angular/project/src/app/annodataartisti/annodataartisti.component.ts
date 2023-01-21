import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { dataartisti } from 'src/models/dataartisti.model';

// importare
import { AnnodataartistiService } from 'src/services/annodataartisti.service';
@Component({
  selector: 'app-annodataartisti',
  templateUrl: './annodataartisti.component.html',
  styleUrls: ['./annodataartisti.component.css']
})
export class AnnodataartistiComponent implements OnInit{

  dati: dataartisti[] = [];
  annoinserito: string ='';
  // save value
  onClick(a: HTMLInputElement ) 
  {
    this.annoinserito = (a.value);
    this.sendData(this.annoinserito);
    return false;
  }

  sendData(annoinserito: string) { let body: HttpParams = new HttpParams().appendAll({annoinserito : annoinserito})
    this.http.post<dataartisti[]>('https://3245-lukebasco121-pyangboot2-iflf8mih949.ws-eu83.gitpod.io/api/anno_data_artisti','',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => this.dati = data);
  }
  
//////////////
  //PrimservoperaService: PrimservoperaService
  constructor(private AnnodataartistiService: AnnodataartistiService, private http: HttpClient, private fb: FormBuilder, private router: Router) {
   }
   // per prendere i dati da py
  mydata: any;
  ngOnInit(): void {
    this.AnnodataartistiService.getdata().pipe(take(1)).subscribe((data: any) => {
      this.mydata = data;
    });
    
    // this.form = this.fb.group({
    //   tecnica: ["", [Validators.required]]
    // });
  }
//////////////
}
