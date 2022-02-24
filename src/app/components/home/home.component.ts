import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

import { TokenStorageService } from '../auth/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from '../../service/calendar.service';
import { CompanyUserService } from '../../service/company-user.service';

import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  info: any;
  niveaus: any;
  currentUser: any;
  loading: boolean;
  companyUser: any;
  isCompany: boolean = false;
  companyInfo: any;
  constructor(private token: TokenStorageService,
    private datepipe: DatePipe,
    private userService: UserService,
    private calendarService: CalendarService,
    private companyUserService: CompanyUserService,
    private router: Router
  ) { }


  ngOnInit() {
    let myDate = new Date();
    this.isCompany = false;

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    console.log(this.info.authorities[0] )

    if (this.info.authorities[0] == "ROLE_COMPANY") { 
      this.companyUserService.getByUserName(this.info.username).subscribe(data => {
        var size = Object.keys(data).length;
        if (size > 0) {
          this.isCompany = true;
          this.companyInfo = data[0];
          this.calendarService.getCalenderCompany(data[0].company.id).subscribe(res => {
            this.companyUser = res.filter(calender => this.datepipe.transform(calender.date, 'yyyy-MM') == this.datepipe.transform(myDate, 'yyyy-MM'))
            console.log(this.companyUser);
          });
        } 
      })
    } else {

      this.userService.getAll().subscribe(data => {

        let findUser = data.filter(user => user.username == this.info.username)[0]

        this.currentUser = findUser.id

        let k = this.datepipe.transform(myDate, 'yyyy-MM-dd');
        let newdDate = new Date(k + ' 01:00:00');
 
        this.calendarService.gettest(findUser.id, newdDate).subscribe(data => {
          this.niveaus = data;
          console.log(this.niveaus);
        }); 
      });

    }
    
    if (!this.info.token) {
      console.log('a')
      this.router.navigate(['template/auth/login']);

    }

  }

  logout() {
    this.token.signOut();
    window.location.reload();
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
