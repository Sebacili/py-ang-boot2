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
import { SecservoperaComponent } from './secservopera/secservopera.component';
import { SecservoperaService } from 'src/services/secservopera.service';
import { OperaPersonaggiComponent } from './opera-personaggi/opera-personaggi.component';
import { OperapersonaggiService } from 'src/services/operapersonaggi.service';
import { OperaTitoloComponent } from './opera-titolo/opera-titolo.component';
import { OperatitoloService } from 'src/services/operatitolo.service';
import { ArtistiComponent } from './artisti/artisti.component';
import { ArtistiService } from 'src/services/artisti.service';
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
    SecservoperaComponent,
    OperaPersonaggiComponent,
    OperaTitoloComponent,
    ArtistiComponent,
    
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
  providers: [PrimservoperaService,SecservoperaService, OperapersonaggiService, OperatitoloService, ArtistiService],
  ///////////////
  bootstrap: [AppComponent]
})
export class AppModule { }
