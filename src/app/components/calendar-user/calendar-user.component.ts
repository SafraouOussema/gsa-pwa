import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

import { TokenStorageService } from '../auth/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from '../../service/calendar.service';
import { DatePipe } from '@angular/common';
import { Table } from 'primeng/table';
import { CompanyUserService } from '../../service/company-user.service';

@Component({
  selector: 'app-calendar-user',
  templateUrl: './calendar-user.component.html',
  styleUrls: ['./calendar-user.component.css']
})
export class CalendarUserComponent implements OnInit {
  info: any;
  niveaus: any;
  currentUser: any;
  companyUser:any;
  loading: boolean
  constructor(private token: TokenStorageService,
    private datepipe: DatePipe,
    private userService: UserService,
    private calendarService: CalendarService,
    private companyUserService: CompanyUserService,

    private router: Router
  ) { }


  ngOnInit() {

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    this.companyUserService.getByUserName(this.info.username).subscribe(data => {
      var size = Object.keys(data).length;
      if (size > 0) {
        this.calendarService.getCalenderCompany(data[0].company.id).subscribe(res => {
          this.niveaus = res ;
          console.log(this.niveaus);
        });
      }else{
        this.userService.getAll().subscribe(data => {

          let findUser = data.filter(user => user.username == this.info.username)[0]
    
          this.currentUser = findUser.id
    
    
          let myDate = new Date()
          let k = this.datepipe.transform(myDate, 'yyyy-MM');
    
          this.calendarService.getCalenderUser(findUser.id).subscribe(data => {
            this.niveaus = data.filter(calender => calender.date.includes(k));
            console.log(this.niveaus);
          });
    
    
    
        });
      }
    })

 


    if (!this.info.token) {
      console.log('a')
      this.router.navigate(['template/auth/login']);

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
