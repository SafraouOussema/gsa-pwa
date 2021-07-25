import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { TemplateComponent } from './components/template/template.component';


import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { httpInterceptorProviders } from './components/auth/auth-interceptor';


import { ToasterModule, ToasterService } from 'angular2-toaster';


import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';;
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';



export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "/assets/internationalization/", ".json");
}


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
    FicheComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ToasterModule,
    QRCodeModule,
    TableModule,
    ToastModule,
    CalendarModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
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
  providers: [httpInterceptorProviders, ToasterService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

 