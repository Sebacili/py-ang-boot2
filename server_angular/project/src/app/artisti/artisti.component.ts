import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { dataartisti } from 'src/models/dataartisti.model';

// importare
import { ArtistiService } from 'src/services/artisti.service';


@Component({
  selector: 'app-artisti',
  templateUrl: './artisti.component.html',
  styleUrls: ['./artisti.component.css']
})
export class ArtistiComponent {



  dati: dataartisti[] = [];

//////////////
  //PrimservoperaService: PrimservoperaService
  constructor(private ArtistiService: ArtistiService, private http: HttpClient, private fb: FormBuilder, private router: Router) {
   }
   // per prendere i dati da py
   // in questo caso e inutile mydata poiche abbiamo dati
  mydata: any;
  ngOnInit(): void {
    this.ArtistiService.getdata().pipe(take(1)).subscribe((data: any) => {
      this.dati = data;
    });
    
    // this.form = this.fb.group({
    //   tecnica: ["", [Validators.required]]
    // });
  }
  //////////////
}
