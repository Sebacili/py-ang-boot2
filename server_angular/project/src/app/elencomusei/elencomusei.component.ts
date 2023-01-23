import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { dataelencomusei } from 'src/models/dataelencomusei.model';

import { ElencomuseiService } from 'src/services/elencomusei.service';

@Component({
  selector: 'app-elencomusei',
  templateUrl: './elencomusei.component.html',
  styleUrls: ['./elencomusei.component.css']
})
export class ElencomuseiComponent implements OnInit{

  dati: dataelencomusei[] = [];

  //////////////
    //PrimservoperaService: PrimservoperaService
    constructor(private ElencopersonaggiService: ElencomuseiService, private http: HttpClient, private fb: FormBuilder, private router: Router) {
     }
     // per prendere i dati da py
     // in questo caso e inutile mydata poiche abbiamo dati
    mydata: any;
    ngOnInit(): void {
      this.ElencopersonaggiService.getdata().pipe(take(1)).subscribe((data: any) => {
        this.dati = data;
      });
      
      // this.form = this.fb.group({
      //   tecnica: ["", [Validators.required]]
      // });
    }
    //////////////

}
