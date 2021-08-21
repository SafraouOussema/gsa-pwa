import { Component, OnInit  , ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProduitService } from '../../service/produit.service';
import {produit} from './produit';
import { ToasterService, ToasterConfig, Toast,  OnActionCallback, ToasterModule, BodyOutputType } from 'angular2-toaster';

import { NgxSmartModalService } from 'ngx-smart-modal';
 import { TranslateService } from '@ngx-translate/core';

 import { Table } from 'primeng/table';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

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
    Produit: produit;
  
    constructor(private route: ActivatedRoute,
                private router: Router,
                private toasterService: ToasterService,
                private translateService: TranslateService,
                public ngxSmartModalService: NgxSmartModalService,
                private produitService: ProduitService
    )
    {
  
      const keys = [
        'COMPANY.COMPANYSUCCESSTITLE',
         'COMPANY.COMPANYSUCCESSBODY',
         'COMPANY.COMPANYERREURBODY'
      ];
       this.translateService.get(keys).subscribe(
       results => {
           this.successToasterTitle = results[keys[0]];
          this.successToasterBody = results[keys[1]];
          this.erreurToasterBody = results[keys[2]];
  
         }
      );
    }
  
    gcs: any=null;
    niveaus: any=null;
  
    g: any = {};
  
    isSignedUp = false;
    isSignUpFailed = false;
    errorMessage = '';
    delgc : any = {};
  
    gg : any = {};
  
    form: any = {};
  
    gotoList() {
      this.ngOnInit();
    }
  
  
    ngOnInit() {
      this.loadData();
    }
  
  
    loadData(){
      this.produitService.getAll().subscribe(data => {
        this.niveaus = data;
        console.log(this.niveaus);
      });
    }
  
  
  
    onSubmit() {
      if(this.form.pname){
  
        this.Produit = new produit(
          this.form.pname
        );
  
        this.produitService.save(this.Produit).subscribe(
          data => {
            this.toasterService.pop('success', this.successToasterTitle, this.successToasterBody);
            this.gotoList();
            this.loadData();
            this.isSignedUp = true;
            this.isSignUpFailed = false;
          },
          error => {
            this.toasterService.pop('error', this.erreurToasterBody);
  
            this.errorMessage = error.error.message;
            this.isSignUpFailed = true;
          }
        );
  
      }else{
        this.toasterService.pop('error', "vous devez remplir le nom");
  
      }
    }
  
  
  
  
   
  
    remove(form: NgForm) {
      this.produitService.remove(form).subscribe(result => {
        this.loadData();
        this.gotoList();
      }, error => console.error(error));
    }
  

    clear(table: Table, globalFilter) {
      globalFilter.value = null;
      table.filters.global = {
          value: null,
          matchMode: 'contains'
      }
      table.clear();
    }
  
  
  }
  
