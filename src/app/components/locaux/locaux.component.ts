import { Component, OnInit  , ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../service/company.service';
import { LocauxService } from '../../service/locaux.service';
import {locaux} from './locaux';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToasterService, ToasterConfig, Toast, OnActionCallback, ToasterModule, BodyOutputType } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-locaux',
  templateUrl: './locaux.component.html',
  styleUrls: ['./locaux.component.css']
})
export class LocauxComponent implements OnInit  {
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
    Locaux: locaux;
  
    constructor(private route: ActivatedRoute,
                private router: Router,
                private companyService: CompanyService,
                private translateService: TranslateService,
                 private toasterService: ToasterService,
                private locauxService: LocauxService,
                public ngxSmartModalService: NgxSmartModalService
    )
    { 
      const keys = [
        'lOCAL.lOCALSUCCESSTITLE',
         'lOCAL.lOCALSUCCESSBODY',
         'lOCAL.lOCALERREURBODY'
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
  
    companyName :string ;
  
    company: any=null;

    id:any;

    ngOnInit() {
      this.loadData();
    }
  
  
    loadData(){
      this.route.params.subscribe(params => {
        const id = params['id'];
  this.id = params['id'];
        this.locauxService.get(id).subscribe(data => {
          this.gcs = data;
          console.log( this.gcs);
  
        });
        this.companyService.get(id).subscribe(data => {
          this.company = data;
          this.companyName = this.company.label ;
          console.log(data);
        });
      });
    }
  
  
  
    onSubmit() {
      this.Locaux = new locaux(
        this.form.name
        );

        console.log( this.Locaux)
        console.log( this.id )
      this.locauxService.save(this.Locaux,this.id ).subscribe(
        data => {
          this.toasterService.pop('success', this.successToasterTitle, this.successToasterBody);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          this.loadData();
        },
        error => {
          console.log(error);
          this.toasterService.pop('error', this.erreurToasterBody);
  
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
   
    remove(form: NgForm) {
      this.locauxService.remove(form).subscribe(result => {
        this.loadData();
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
  
