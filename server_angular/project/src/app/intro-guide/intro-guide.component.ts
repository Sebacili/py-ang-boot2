import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-intro-guide',
  templateUrl: './intro-guide.component.html',
  styleUrls: ['./intro-guide.component.css']
})
export class IntroGuideComponent implements OnInit{


  localStorageIsEmpty: boolean = false;

  ngOnInit(): void {
    this.isLocalStorageEmpty();
    this.addsuggFrom = this.fb.group({
      nome: ["", [Validators.required]],
      difficolta: ["", [Validators.required]],
      n_gioc: ["", [Validators.required]],
      scopo: ["", [Validators.required]],
    });
  }

  isLocalStorageEmpty(): boolean {
    if(localStorage.length === 0){
      return this.localStorageIsEmpty = true;
    } else {
      return this.localStorageIsEmpty = false;
    }
  }

  addsuggFrom!: FormGroup;
  

  constructor(private http: HttpClient, private fb: FormBuilder) { }



  Create() {

    let body: HttpParams = new HttpParams();
    body = body.appendAll({
      name_user: this.addsuggFrom.value.name_user,
      email: this.addsuggFrom.value.email,
      message: this.addsuggFrom.value.message,   
    })

    // Esegue la richiesta non tipizzata
    this.http.post("https://3245-lukebasco121-pyangboot2-1gkb14v78nt.ws-eu83.gitpod.io/api/suggerimento", '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => {
      console.log(data);
    })
  }

//   name_user: string ='';
//   email: string ='';
//   message: string ='';
//   // save value
//   onClick( n: HTMLInputElement  ,e : HTMLInputElement,m : HTMLInputElement  ) 
//   {
//     this.name_user = (n.value);
//     this.email = (e.value);
//     this.message = (m.value);
//     this.sendData(this.name_user, this.email, this.message);
//     return false;
//   }

//   dati: any;
//   sendData(name_user: string, email: string, message: string) { let body: HttpParams = new HttpParams().appendAll({name_user : name_user, email : email, message : message})
//   this.http.post('https://3245-lukebasco121-pyangboot2-1gkb14v78nt.ws-eu83.gitpod.io/api/suggerimento','',{
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json'
//     }),
//     params: body,
//     responseType: "json"
//   }).subscribe(data => this.dati = data);
// }
}




