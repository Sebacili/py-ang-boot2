import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ManagerService } from 'src/services/manager.service';
import { Data, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // form_info_u = {
  //   name: '',
  //   email: '',
  //   passw: '',
  //   repeatedpassw: ''
  // }
  form!: FormGroup;
  errorMessage!: string;
  statusCode!: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private manager: ManagerService
  ) { }


  ngOnInit(): void {
    // Controllo se l'utente ha gia' eseguito il login
    if (this.manager.getUser.id != -1) this.router.navigate(['/dashboard']);

    // Inizializzo la form
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      nome_ut: ["", [Validators.required]],
      password: ["", [Validators.required]],
      reppassw: ["", [Validators.required]]
    })
  }

  submit() {
    // Creo l'oggetto che verra' inviaro al server Flask con le credenziali delll'utente
    let body: HttpParams = new HttpParams().appendAll({
      'email': this.form.value.email,
      'nome_ut': this.form.value.name,
      'password': this.form.value.password,
      'reppassw': this.form.value.password
    });

    // Eseguo la richiesta in POST
    this.http.post<Data>('http://127.0.0.1:3245/api/register', '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => {
      // Aspetto la risposta del server e comunico all'utente la risposta
      if (data['statusCode'] == 200) {
        // Invio le informazioni dell'utente alle pagine in ascolto
        this.manager.setUser(data['data']);

        // Reindirizzo l'utente alla sua dashboard
        this.router.navigate(['/dashboard']);
      } else {
        this.statusCode = data['statusCode'];
        this.errorMessage = data['errorMessage'];
      }
    });
  }















  // senddata(){
  //   this.http.post('https://3245-lukebasco121-pyangboot2-qrwb9ohee2q.ws-eu83.gitpod.io/info/post/registration', this.form).subscribe()
  // }

}












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