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
import { ToasterService  } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import { DeratisationService } from '../../service/deratisation.service';
import {  DesinectisationService } from '../../service/desinectisation.service';


@Component({
  selector: 'app-company-fiche',
  templateUrl: './company-fiche.component.html',
  styleUrls: ['./company-fiche.component.css']
})
export class CompanyFicheComponent implements OnInit {

  companyId: any;
  fiches: any;
  filterData: any;
  filterNewData: any;
  newData: any;
  Fichea: fiche[] = [];
  Fiche: fiche;

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
    private desinsectisationService:  DesinectisationService,
    private toasterService: ToasterService) { }

  ngOnInit() {
    let FicheList: fiche[] = [];
    let fiche: fiche;
    let promises: Promise<any>[] = [];
    this.filterNewData =[] ;
    this.newData =[] ;
    let i = 0 ;
    this.route.params.subscribe(params => {  
      this.companyId = params['companyid']; 
      this.ficheService.getAll().subscribe(data => {
        console.log("all", data)
        if (data != null) {
          this.fiches = data;
          this.fiches = this.fiches.filter(fiche => fiche.company.id == this.companyId)
          this.filterData = this.fiches;

          this.fiches.forEach(element => {

            promises.push(this.deratisationService.get(element.id).toPromise());
            promises.push(this.desinsectisationService.get(element.id).toPromise());

            Promise.all(promises).then(results => { 
              console.log("results", results);
              fiche = {
                nresponsable: element.nresponsable,
                incerticide: element.incerticide,
                nencadreur: element.nencadreur,
                observations: element.observations,
                harrive: element.harrive,
                hdepart: element.hdepart,
                deratisation: results[i],
                desinsectisation: results[i+1],
                user:element.user,
                calendar:element.calendar
              };
              i= i+2;
              this.newData.push(fiche) ;
              this.filterNewData.push(fiche);
              console.log("filterNewData",  this.filterNewData);
            }); 
          }); 
        }
      });
    });
  }

  search(term: string) {
    if (!term) {
      this.filterData = this.newData;
    } else {
      this.filterData = this.newData.filter(x =>
        x.user.name.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    } 
  }

}
