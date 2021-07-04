import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http'; 
import { ToastrModule } from 'ngx-toastr';
import { QRCodeModule } from 'angularx-qrcode';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { UsersFicheComponent } from './components/users-fiche/users-fiche.component';
import { ProduitComponent } from './components/produit/produit.component';
import { LocauxComponent } from './components/locaux/locaux.component';
import { HomeComponent } from './components/home/home.component';
import { LeftNaveComponent } from './components/left-nave/left-nave.component';
import { HeadrComponent } from './components/headr/headr.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyFicheComponent } from './components/company-fiche/company-fiche.component';
import { DeratisationComponent } from './components/deratisation/deratisation.component';
import { DesinsectisationComponent } from './components/desinsectisation/desinsectisation.component';
import { FicheComponent } from './components/fiche/fiche.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    UsersFicheComponent,
    ProduitComponent,
    LocauxComponent,
    HomeComponent,
    LeftNaveComponent,
    HeadrComponent,
    CalendarComponent,
    CompanyComponent,
    CompanyFicheComponent,
    DeratisationComponent,
    DesinsectisationComponent,
    FicheComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    FontAwesomeModule,
    QRCodeModule,
    BrowserAnimationsModule, // required animations module
    NgxSmartModalModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}