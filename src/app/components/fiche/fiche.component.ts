import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from '../../service/calendar.service';
import { CompanyService } from '../../service/company.service';
import { UserService } from '../../service/user.service';
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

  constructor(private route: ActivatedRoute,
    private router: Router,
    private calendarService: CalendarService,
    private companyService: CompanyService,
    private userService: UserService,
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

  niveaus: Array<any>;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.route.params.subscribe(params => {
      this.companyid = params['companyid'];


    });
    this.calendarService.getAll().subscribe(data => {
      for (let entry of data) {
        if (entry.date == this.datePipe.transform(this.myDate, "yyyy-MM-dd")) {
          if (this.token.getUsername() == entry.user.username) {

            this.cal.push(entry);

            this.niveaus = this.cal;
          }
        }
      }
      this.companyService.getAll().subscribe(dataa => {
        for (let entry of this.niveaus) {
          for (let entr of dataa) {
            if (entry.company.id == entr.id) {
              console.log(entry)
              this.com.push(entr);
              this.companys = this.com;
            }
          }
        }
      });
    });

    this.userService.getAll().subscribe(data => {
      this.users = data;
      for (let entr of data) {
        if (this.token.getUsername() == entr.username) {
          this.users = Array.of(entr);
        }
      }
      console.log(this.users[0].roles[0].name == 'ROLE_USER')

    });



    this.ficheService.getAll().subscribe(data => {
      console.log("all", data)
      if (data != null) {
        for (let entry of data) {
          if (entry.calendar.date == this.datePipe.transform(this.myDate, "yyyy-MM-dd") && entry.company.id == this.companyid) {
            if (this.token.getUsername() == entry.user.username) {

              this.Fichea.push(entry);

              this.fiches = this.Fichea;
            }
          }
        }


      }

    });

  }

  gotoList() {
    this.router.navigate(['/fiche']);
  }



  async onSubmit() {

    this.Fiche = new fiche(
      this.form.nresponsable,
      this.form.incerticide,
      this.form.nencadreur,
      this.form.observations,
      this.form.harrive,
      this.form.hdepart
    );
    this.route.params.subscribe(params => {

      this.selecteduser = params['userid'];
      this.selectedcompany = params['companyid'];
      this.selectedcalendar = params['calanderid'];


    });





    if (this.form.hdepart > this.form.harrive) {

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



    } else {
      console.log('erreur');
    }

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
