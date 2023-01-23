import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { dataelencoopere } from 'src/models/dataelencoopere.model';

import { ElencoopereService } from 'src/services/elencoopere.service';

@Component({
  selector: 'app-elencoopere',
  templateUrl: './elencoopere.component.html',
  styleUrls: ['./elencoopere.component.css']
})
export class ElencoopereComponent implements OnInit{

  dati: dataelencoopere[] = [];

  //////////////
    //PrimservoperaService: PrimservoperaService
    constructor(private ElencopersonaggiService: ElencoopereService, private http: HttpClient, private fb: FormBuilder, private router: Router) {
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
