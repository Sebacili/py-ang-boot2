import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ManagerService } from 'src/services/manager.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Data } from 'src/models/redirectData.model';
import { StorageregisterService } from 'src/services/storageregister.service';
import { StorageServie } from 'src/services/storage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  url: string = "https://3245-lukebasco121-pyangboot2-iflf8mih949.ws-eu83.gitpod.io/register/data";
  form!: FormGroup;
  errorMessage!: string;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private storage: StorageregisterService
  ) { }

  ngOnInit(): void {
    if (this.storage.getData('id') != null) this.router.navigate(['homepage']);

    this.form = this.fb.group({
      nome_utente: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      passw: ["", [Validators.required]]
    });
  }

  submit() {
    let body: HttpParams = new HttpParams();
    body = body.appendAll({
      nome_utente: this.form.value.nome_utente,
      email: this.form.value.email,
      passw: this.form.value.passw
    });

    this.http.post<Data>(this.url, '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => {
      console.log(data.data);

      if (data.url != null) {
        this.router.navigate([data.url]);
      } else {
        this.errorMessage = data.data;
      }
    })
  }
}


  // senddata(){
  //   this.http.post('https://3245-lukebasco121-pyangboot2-qrwb9ohee2q.ws-eu83.gitpod.io/info/post/registration', this.form).subscribe()
  // }














// aggiungendo questi linee di codice ha buggato il routerlink o la pag di registrazione in generale

// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   form = {
//     name: '',
//     email: '',
//     passw: '',
//     repeatedpassw: ''
//   }

//   constructor( private http: HttpClient){}
//   senddata(){
//     this.http.post('https://3245-lukebasco121-pyangboot2-qrwb9ohee2q.ws-eu83.gitpod.io/info/post/registration', this.form).subscribe()
//   }

// }