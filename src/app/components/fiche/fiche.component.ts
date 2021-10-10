import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from '../../service/calendar.service';
import { CompanyService } from '../../service/company.service';
import { UserService } from '../../service/user.service';
import {  ScanedCodeService } from '../../service/scaned-code.service';

import { FicheService } from '../../service/fiche.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { fiche } from './fiche';
import { DatePipe } from '@angular/common';
import { company } from '../company/company';
import { calendar } from '../calendar/calendar';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToasterService, ToasterConfig, Toast, OnActionCallback, ToasterModule, BodyOutputType } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css']
})
export class FicheComponent implements OnInit {
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

  myDate = new Date();
  public companyid: any;
  public selecteduser = null;
  public selectedcompany = null;
  public selectedcalendar = null;
  cal: calendar[] = [];
  com: company[] = [];
  Fichea: fiche[] = [];
  form: any = {};
  Fiche: fiche;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  gg: any = {};
  users: Array<any>;
  companys: Array<any>;
  fiches: Array<any>;
  nope = 0;

  
  niveaus: Array<any>;
  harrive :string ; 
  hdepart :string ;
  scendDate:number=0 ;
  dateList =[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private calendarService: CalendarService,
    private companyService: CompanyService,
    private userService: UserService,
    private scanedCodeService:ScanedCodeService,
    private ficheService: FicheService,
    private datePipe: DatePipe,
    private token: TokenStorageService,
    public ngxSmartModalService: NgxSmartModalService,
    private translateService: TranslateService,
    private toasterService: ToasterService,
  ) {
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


  ngOnInit() {
    this.loadData();
  }

  loadData() {
    let promises: Promise<any>[] = []; 
    this.dateList=[]; 
    this.route.params.subscribe(params => {
      this.companyid = params['companyid'];
      this.selectedcalendar = params['calanderid']; 
    });

    promises.push(this.calendarService.getAll().toPromise());
    promises.push(this.companyService.getAll().toPromise());
    promises.push(this.ficheService.getAll().toPromise());
    promises.push(this.scanedCodeService.getScanedCodeByCalanderId(this.selectedcalendar).toPromise())
  
    return Promise.all(promises).then(results => {

      console.log("find user", results) ;
      
      for (let entry of results[0]) {
        if (entry.date == this.datePipe.transform(this.myDate, "yyyy-MM-dd")) {
          if (this.token.getUsername() == entry.user.username) {

            this.cal.push(entry);

            this.niveaus = this.cal;
          }
        }
      }

      for (let entry of this.niveaus) {
        for (let entr of results[1]) {
          if (entry.company.id == entr.id) {
            console.log(entry)
            this.com.push(entr);
            this.companys = this.com;
          }
        }
      }

      if (results[2] != null) {
        for (let entry of results[2]) {
          if (entry.calendar.date == this.datePipe.transform(this.myDate, "yyyy-MM-dd") && entry.company.id == this.companyid) {
            if (this.token.getUsername() == entry.user.username) {
              this.Fichea.push(entry);
              this.fiches = this.Fichea;
            }
          }
        }
      }

      results[3].forEach(element => {
        
        let firstDate = new Date(element.date + " " + element.time)
        firstDate.getTime();
        let createDate = {
          date:firstDate,
          time:firstDate.getTime()
        } 
          this.dateList.push(createDate); 
      });
 
 

    });

  }

  gotoList() {
    this.router.navigate(['/fiche']);
  }

  async onSubmit() {

    this.dateList.sort((a, b) => (a.color > b.color) ? 1 : -1)

    console.log( this.dateList)
    this.harrive = this.datePipe.transform(this.dateList[this.dateList.length-1].date, ("shortTime"))
    this.hdepart = this.datePipe.transform( this.dateList[0].date, ("shortTime"))



    this.Fiche = new fiche(
      this.form.nresponsable,
      this.form.incerticide,
      this.form.nencadreur,
      this.form.observations,
      this.harrive,
      this.hdepart
    );

    this.route.params.subscribe(params => { 
      this.selecteduser = params['userid'];
      this.selectedcompany = params['companyid'];
      this.selectedcalendar = params['calanderid']; 
    });


    console.log( this.Fiche)



      this.ficheService.save(this.Fiche, this.selecteduser, this.selectedcompany, this.selectedcalendar).subscribe(
        data => {
          this.toasterService.pop('success', this.successToasterTitle, this.successToasterBody);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          this.ngOnInit();
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

    this.ficheService.remove(this.gg).subscribe(result => {

      this.loadData();
    }, error => console.error(error));

  }

  reloadPage() {
    window.location.reload();
  }
  /**
   * 
   * @param table 
   * @param globalFilter 
   */
  clear(table: Table, globalFilter) {
    globalFilter.value = null;
    table.filters.global = {
      value: null,
      matchMode: 'contains'
    }
    table.clear();
  }

}
