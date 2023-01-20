import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MuseiComponent } from './musei/musei.component';
import { PersonaggiComponent } from './personaggi/personaggi.component';
import { HttpClientModule } from '@angular/common/http';
import { IntroGuideComponent } from './intro-guide/intro-guide.component';
import { PrimservoperaComponent } from './primservopera/primservopera.component';
import { PrimservoperaService } from 'src/services/primservopera.service';
// ng add ngx-bootstrap - https://www.npmjs.com/package/ngx-bootstrap
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    MuseiComponent,
    PersonaggiComponent,
    IntroGuideComponent,
    PrimservoperaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  ////////////////
  // for retreiving data from py
  providers: [PrimservoperaService],
  ///////////////
  bootstrap: [AppComponent]
})
export class AppModule { }
