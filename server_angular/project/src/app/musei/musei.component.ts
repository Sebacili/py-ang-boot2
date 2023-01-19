import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Museo } from '../../models/dataMuseo.model';

@Component({
  selector: 'app-musei',
  templateUrl: './musei.component.html',
  styleUrls: ['./musei.component.css']
})
export class MuseiComponent implements OnInit {
  musei: Museo[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Museo[]>('https://3245-lukebasco121-pyangboot2-bbser5npjxp.ws-eu81.gitpod.io/api/musei', {}).subscribe(data => {
    this.musei = data;
    console.log(this.musei);
    })
  }

}
