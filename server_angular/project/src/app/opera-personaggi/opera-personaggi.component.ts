import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { operapersonaggi } from 'src/models/operapersonaggi.model';

// importare questo
import { OperapersonaggiService } from 'src/services/operapersonaggi.service';
@Component({
  selector: 'app-opera-personaggi',
  templateUrl: './opera-personaggi.component.html',
  styleUrls: ['./opera-personaggi.component.css']
})
export class OperaPersonaggiComponent implements OnInit{


  dati: operapersonaggi[] = [];
  opera: string ='';
  // save value
  onClick(o: HTMLInputElement ) 
  {
    this.opera = (o.value);
    this.sendData(this.opera);
    return false;
  }

  sendData(opera: string) { let body: HttpParams = new HttpParams().appendAll({opera : opera})
    this.http.post<operapersonaggi[]>('https://3245-lukebasco121-pyangboot2-1gkb14v78nt.ws-eu83.gitpod.io/api/opera_personaggi','',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => this.dati = data);
  }
  
//////////////
  //PrimservoperaService: PrimservoperaService
  constructor(private OperapersonaggiService: OperapersonaggiService, private http: HttpClient, private fb: FormBuilder, private router: Router) {
   }
   // per prendere i dati da py
  mydata: any;
  ngOnInit(): void {
    this.OperapersonaggiService.getdata().pipe(take(1)).subscribe((data: any) => {
      this.mydata = data;
    });
    
    // this.form = this.fb.group({
    //   tecnica: ["", [Validators.required]]
    // });
  }
//////////////
}
