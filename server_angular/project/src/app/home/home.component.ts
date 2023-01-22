import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { datadynamichomeartista } from 'src/models/datadynamichomeartista.model';
import { datadynamichomeopera } from 'src/models/datadynamichomeopera.model';
import { TempnumberoperaService } from 'src/services/tempnumberopera.service';
import { TempnumberartistaService } from 'src/services/tempnumberartista.service';
import { datadynamichomemuseo } from 'src/models/datadynamichomemuseo.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isShow = false;

  operedata : datadynamichomeopera[] | undefined;
  data: Object | undefined;
  loading: boolean | undefined;
  o: Observable<Object> | undefined;
  obsoperedata : Observable<datadynamichomeopera[]> | undefined;

  //, public TempnumberartistaService : TempnumberartistaService
  constructor(public http: HttpClient, public TempnumberoperaService : TempnumberoperaService) { }

  tempNumOpera :  number = 0;
  // tempNumArtista :  number = 0;
  // tempNumMuseo :  number = 0;
  ngOnInit(): void {
    this.TempnumberoperaService.setTempNumOpera();
    this.tempNumOpera = this.TempnumberoperaService.getTempNumOpera();
    // this.TempnumberartistaService.setTempNumArtista();
    // this.tempNumArtista = this.TempnumberartistaService.getTempNumArtista();
    // this.TempnumberartistaService.setTempNumMuseo();
    // this.tempNumArtista = this.TempnumberartistaService.getTempNumMuseo();
    this.sendDataOpera(this.tempNumOpera);
    // this.sendDataArtista(this.tempNumArtista);
    // this.sendDataMuseo(this.tempNumMuseo);
  }



  // send value for opera to python 
  datiOpera: datadynamichomeopera[] = [];
  sendDataOpera(tempNumOpera: number) 
  { let body: HttpParams = new HttpParams().appendAll({tempNumOpera : tempNumOpera})
    this.http.post<datadynamichomeopera[]>('https://3245-lukebasco121-pyangboot2-1gkb14v78nt.ws-eu83.gitpod.io/api/dynamicHome/opera','',
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => this.datiOpera = data);
  }

  // datiArtista: datadynamichomeartista[] = [];
  // sendDataArtista(tempNumArtista: number) 
  // { let body: HttpParams = new HttpParams().appendAll({tempNumArtista : tempNumArtista})
  //   this.http.post<datadynamichomeartista[]>('https://3245-lukebasco121-pyangboot2-iflf8mih949.ws-eu83.gitpod.io/api/dynamicHome/artista','',
  //   {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     params: body,
  //     responseType: "json"
  //   }).subscribe(data => this.datiArtista = data);
  // }

  // datiMuseo: datadynamichomemuseo[] = [];
  // sendDataMuseo(tempNumArtista: number) 
  // { let body: HttpParams = new HttpParams().appendAll({tempNumArtista : tempNumArtista})
  //   this.http.post<datadynamichomemuseo[]>('https://3245-lukebasco121-pyangboot2-iflf8mih949.ws-eu83.gitpod.io/api/dynamicHome/museo','',
  //   {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     params: body,
  //     responseType: "json"
  //   }).subscribe(data => this.datiMuseo = data);
  // }



  toggleDisplay() {
    this.isShow = !this.isShow;
  }


}
