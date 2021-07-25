import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../service/company.service';
import { company } from './company';

import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToasterService  } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyComponent implements OnInit {
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

  form: any = {};
  Company: company;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  gg: any = {};
  filterData :any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private toasterService: ToasterService,
    public ngxSmartModalService: NgxSmartModalService,
    private compnayService: CompanyService) {

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

  companys: Array<any>;
  ngOnInit() {

    this.loadData();



  }

  loadData() {
    this.compnayService.getAll().subscribe(data => {
      this.companys = data;
      this.filterData = data; 
    });
  }

  gotoList() {
    this.ngOnInit();
  }

  onSubmit() {
    this.Company = new company(
      this.form.label,
      this.form.address);

    this.compnayService.save(this.Company).subscribe(
      data => {
        this.toasterService.pop('success', this.successToasterTitle, this.successToasterBody);
        this.gotoList();
        this.loadData();
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


  remove(form: NgForm) {

    this.gg = form;

    this.compnayService.remove(this.gg).subscribe(result => {
      this.gotoList();
      this.loadData();
    }, error => console.error(error));

  }

  search(term: string) {
    if(!term) {
      this.filterData = this.companys;
    } else {
      this.filterData = this.companys.filter(x => 
         x.label.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
    console.log( this.filterData);
  }
   
    
  clear(table: any) {
    table.clear();
  
  }


}
