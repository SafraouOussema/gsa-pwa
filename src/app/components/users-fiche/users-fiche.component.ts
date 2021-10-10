import { Component, OnInit } from '@angular/core';
import { fiche } from './fiche';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from '../../service/calendar.service';
import { CompanyService } from '../../service/company.service';
import { UserService } from '../../service/user.service';
import { FicheService } from '../../service/fiche.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { DatePipe } from '@angular/common';
import { company } from '../company/company';
import { calendar } from '../calendar/calendar';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToasterService, ToasterConfig, Toast, OnActionCallback, ToasterModule, BodyOutputType } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import { DeratisationService } from '../../service/deratisation.service';
import {  DesinectisationService } from '../../service/desinectisation.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-users-fiche',
  templateUrl: './users-fiche.component.html',
  styleUrls: ['./users-fiche.component.css']
})
export class UsersFicheComponent implements OnInit  {

  
  companyId: any;
  fiches: any;
  filterData: any;
  filterNewData: any;
   newData: any;
  Fichea: fiche[] = [];
  Fiche: fiche;
  loading : boolean ;
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
    private deratisationService: DeratisationService,
    private desinsectisationService: DesinectisationService,
    private toasterService: ToasterService) { }

  ngOnInit() {
    let FicheList: fiche[] = [];
    let fiche: fiche;
    let promises: Promise<any>[] = [];
    this.filterNewData =[] ;
    this. newData=[] ;
    let i = 0 ; 
    this.loading = true ;
    this.route.params.subscribe(params => {  
      this.companyId = params['userid']; 
      this.ficheService.getAll().subscribe(data => {
        if (data != null) {
          this.fiches = data;
           this.newData = this.fiches.filter(fiche => fiche.user.id == this.companyId)
          this.filterNewData = this.newData;
          console.log("data", this.fiches);

          
        }
      });
    });
  }

  search(term: string) {
    if (!term) {
      this.filterNewData = this.newData;
    } else {
      this.filterNewData = this.newData.filter(x =>
        x.calendar.company.label.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    } 
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
 