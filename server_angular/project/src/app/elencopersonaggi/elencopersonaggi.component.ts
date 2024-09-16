import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { dataelencopersonaggi } from 'src/models/dataelencopersonaggi.model';


import { ElencopersonaggiService } from 'src/services/elencopersonaggi.service';
@Component({
  selector: 'app-elencopersonaggi',
  templateUrl: './elencopersonaggi.component.html',
  styleUrls: ['./elencopersonaggi.component.css']
})
export class ElencopersonaggiComponent {



  dati: dataelencopersonaggi[] = [];

//////////////
  //PrimservoperaService: PrimservoperaService
  constructor(private ElencopersonaggiService: ElencopersonaggiService, private http: HttpClient, private fb: FormBuilder, private router: Router) {
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
