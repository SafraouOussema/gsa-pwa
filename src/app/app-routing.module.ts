import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

 
 import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {  UsersComponent } from './components/users/users.component';
//import { PmComponent } from './components/pm/pm.component';
//import { AdminComponent } from './components/admin/admin.component';
import { CompanyComponent } from './components/company/company.component'
import { CalendarComponent } from './components/calendar/calendar.component';
import { FicheComponent } from './components/fiche/fiche.component';
import { ProduitComponent } from './components/produit/produit.component';
import { LocauxComponent } from './components/locaux/locaux.component';
import { DesinsectisationComponent } from './components/desinsectisation/desinsectisation.component';
import { DeratisationComponent } from './components/deratisation/deratisation.component';
//import { FicheEntrepriseComponent } from './components/fiche-entreprise/fiche-entreprise.component';
import {TemplateComponent} from './components/template/template.component';
import {CompanyFicheComponent} from './components/company-fiche/company-fiche.component';
 import {   UsersFicheComponent } from './components/users-fiche/users-fiche.component';
 import {    ExportFicheComponent } from './components/export-fiche/export-fiche.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'template/home',
    pathMatch: 'full'
  },
  {
    path: 'template/auth/login',
    component: LoginComponent
  },
  {
      path: 'template',
      component: TemplateComponent,
      children: [

        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: 'calendar',
          component: CalendarComponent
        },
        {
          path: 'produit',
          component: ProduitComponent
        },
          {
          path:'home/template/exportfiche/:calanderid',
            component: ExportFicheComponent
         },
        {
          path: 'home/template/fiche/:calanderid/:companyid/:userid',
          component: FicheComponent
        }, 
        {
          path: 'company',
          component: CompanyComponent
        },
        {
          path: 'home/template/fiche/:calanderid/:companyid/:userid/template/deratisation/:fichid/:companyid',
          component: DeratisationComponent
        },
        {
          path: 'home/template/fiche/:calanderid/:companyid/:userid/template/desinsectisation/:fichid/:companyid',
          component: DesinsectisationComponent
        },
        {
          path: 'company/template/locaux/:id',
          component: LocauxComponent
        },
        {
          path: 'company/template/fiche/:companyid',
          component: CompanyFicheComponent
        },
        {
          path: 'user',
          component: UsersComponent
        },
        {
          path: 'users',
          component : UsersComponent 
        }, {
          path: 'users/template/fiche/:userid',
          component: UsersFicheComponent
        }
        // ,{
        //   path: 'pm',
        //   component: PmComponent
        // },
        // {
        //   path: 'admin',
        //   component: AdminComponent
        // },

        // {
        //   path: 'signup',
        //   component: RegisterComponent
        // }

      ]
    }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
