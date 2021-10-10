import { Component, OnInit  , NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../service/company.service';
import { DeratisationService } from '../../service/deratisation.service';
import {deratisation} from './deratisation';
import {ProduitService} from '../../service/produit.service';
import {LocauxService} from '../../service/locaux.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToasterService, ToasterConfig, Toast,    OnActionCallback, ToasterModule, BodyOutputType } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import {  ScanedCodeService } from '../../service/scaned-code.service';

import { Table } from 'primeng/table';
 
@Component({
  selector: 'app-deratisation',
  templateUrl: './deratisation.component.html',
  styleUrls: ['./deratisation.component.css']
})
export class DeratisationComponent implements OnInit  {
  /**
    * Success toaster title of members teams component
    */
   successToasterTitle: string;
   /**
    * Success toaster body of members teams component
    */
   successToasterBody: string;
   /**
    * Erreur toaster body of members teams component
    */
   erreurToasterBody: string;
 
 
   public selecteclass  = null;
   Deratisation: deratisation;
 
   constructor(private route: ActivatedRoute,
               private router: Router,
               private zone:NgZone,
               private companyService: CompanyService,
               private scanedCodeService : ScanedCodeService,
               private deratisationService: DeratisationService,
               private produitService: ProduitService,
               private locauxService: LocauxService,
               private translateService: TranslateService,
               private toasterService: ToasterService,
               public ngxSmartModalService: NgxSmartModalService
  
   )
   { const keys = [
     'DERATIZATION.DERATIZATIONSUCCESSTITLE',
      'DERATIZATION.DERATIZATIONSUCCESSBODY',
      'DERATIZATION.DERATIZATIONERREURBODY'
   ];
    this.translateService.get(keys).subscribe(
    results => {
        this.successToasterTitle = results[keys[0]];
       this.successToasterBody = results[keys[1]];
       this.erreurToasterBody = results[keys[2]];
 
      }
   );}
 
   gcs: any=null;
   niveaus: any=null;
   produits: any=null;
 fi : any =null ;
   g: any = {};
 
   isSignedUp = false;
   isSignUpFailed = false;
   errorMessage = '';
   delgc : any = {};
 
   gg : any = {};
 
   form: any = {};
 
 
   public selectedproduit = null;
   public selectedlocaux = null;
 
   ngOnInit() {
     this.loadData();
   }
 
 
   loadData(){    
     let promises: Promise<any>[] = [];

     this.route.params.subscribe(params => {
       const id = params['fichid'];
       this.fi = id ;
       const comid = params['companyid'];
       let selectedcalendar = params['calanderid'];

       promises.push(this.deratisationService.get(id).toPromise());
       promises.push(this.locauxService.get(comid).toPromise());
       promises.push(this.produitService.getAll().toPromise());
       promises.push(this.scanedCodeService.getScanedCodeByCalanderId(selectedcalendar).toPromise())
 
       return Promise.all(promises).then(results => {
         console.log(results)
         this.gcs = results[0]; 
         this.produits = results[2];
         this.niveaus = results[1].filter((v, i) => results[3].findIndex(item => item.locaux.id == v.id) != -1);
     
       });
 
     });
   
   } 
 
 
 
   onSubmit() {
     if(this.form.quantite==0){
       this.form.acceder = false
     }else{
       this.form.acceder=true
     }
     this.Deratisation = new deratisation(
       this.form.acceder,
       this.form.quantite);
  
 
     this.deratisationService.save(this.Deratisation,this.fi,this.selectedlocaux,this.selectedproduit).subscribe(
       data => {
         this.toasterService.pop('success', this.successToasterTitle, this.successToasterBody);
 
       this.ngOnInit();
       this.ngOnInit();
         this.isSignedUp = true;
         this.isSignUpFailed = false;
       },
       error => {
         console.log(error);
         this.toasterService.pop('error', this.erreurToasterBody);
 
         this.errorMessage = error.error.message;
         this.isSignUpFailed = true;
       }
     );
   }
 
  
   clear(table: Table, globalFilter) {
    globalFilter.value = null;
    table.filters.global = {
        value: null,
        matchMode: 'contains'
    }
    table.clear();
  }

 
 
 
   remove(form: NgForm) {
     this.deratisationService.remove(form).subscribe(result => {
       this.ngOnInit();
     }, error => console.error(error));
   }
 
 
 
 }
 