import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {CalendarService} from '../../service/calendar.service';
import {calendar} from './calendar';
import {CompanyService} from '../../service/company.service';
import {UserService} from '../../service/user.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToasterService } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public selecteduser = null;
  public selectedcompany = null;

  form: any = {};
  Calendar: calendar;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  gg : any= {};
  users: Array<any>;
  companys: Array<any>;

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
  constructor(private route: ActivatedRoute,
              private router: Router,private calendarService:CalendarService,
              private compnayService:CompanyService,
              private translateService: TranslateService,
               private toasterService: ToasterService,
              private userService:UserService,
              public ngxSmartModalService: NgxSmartModalService
  ) {

    const keys = [
      'CALENDAR.CALENDARSUCCESSTITLE',
       'CALENDAR.CALENDARSUCCESSBODY',
       'CALENDAR.CALENDARERREURBODY'
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

  loadData(){
    this.calendarService.getAll().subscribe(data => {
      this.niveaus = data; 
    });
    this.userService.getAll().subscribe(data => {
      this.users = data.filter(user=>user.roles[0].name  != "ROLE_COMPANY"); 
    });
    this.compnayService.getAll().subscribe(data => {
      this.companys = data; 
    });




  }

  gotoList() {
    this.ngOnInit();
  //  this.router.navigate(['/calendar']);
  }

  onSubmit() {

    this.Calendar = new calendar(
      this.form.date  );
    this.calendarService.save(this.Calendar,this.selecteduser,this.selectedcompany).subscribe(
      data => {
        this.toasterService.pop('success', this.successToasterTitle, this.successToasterBody);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.gotoList();
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

    this.gg = form ;

    this.calendarService.remove(this.gg).subscribe(result => {
      this.gotoList();
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
