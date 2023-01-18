import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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