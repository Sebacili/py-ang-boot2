import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { datasecservopera } from 'src/models/datasecservopera.model';

// importare questo
import { SecservoperaService } from 'src/services/secservopera.service';

@Component({
  selector: 'app-secservopera',
  templateUrl: './secservopera.component.html',
  styleUrls: ['./secservopera.component.css']
})
export class SecservoperaComponent implements OnInit{

  dati: datasecservopera[] = [];
  nome_artista: string ='';
  cognome_artista: string ='';
  // save value
  onClick( n: HTMLInputElement  ,c : HTMLInputElement ) 
  {
    this.nome_artista = (n.value);
    this.cognome_artista = (c.value);
    this.sendData(this.nome_artista, this.cognome_artista);
    return false;
  }

  sendData(nome_artista: string, cognome_artista: string) { let body: HttpParams = new HttpParams().appendAll({nome_artista : nome_artista, cognome_artista : cognome_artista})
    this.http.post<datasecservopera[]>('https://3245-lukebasco121-pyangboot2-1gkb14v78nt.ws-eu83.gitpod.io/api/artista_musei','',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => this.dati = data);
  }
  
//////////////
  //PrimservoperaService: PrimservoperaService
  constructor(private SecservoperaService: SecservoperaService, private http: HttpClient, private fb: FormBuilder, private router: Router) {
   }
   // per prendere i dati da py
  mydata: any;
  ngOnInit(): void {
    this.SecservoperaService.getdata().pipe(take(1)).subscribe((data: any) => {
      this.mydata = data;
    });
    
    // this.form = this.fb.group({
    //   tecnica: ["", [Validators.required]]
    // });
  }
//////////////

}
