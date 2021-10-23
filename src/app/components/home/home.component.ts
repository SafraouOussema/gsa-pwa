import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

import { TokenStorageService } from '../auth/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from '../../service/calendar.service';
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
  currentUser:any;
  loading :boolean
  constructor(private token: TokenStorageService,
    private datepipe: DatePipe,
    private userService: UserService,
    private calendarService: CalendarService,
    private router: Router
  ) { }

  
  ngOnInit() {

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    this.userService.getAll().subscribe(data => {
      
      let findUser = data.filter(user=>user.username == this.info.username)[0]

      this.currentUser = findUser.id
      
    let myDate = new Date()
    let k = this.datepipe.transform(myDate, 'yyyy-MM-dd');
    let newdDate = new Date(k + ' 01:00:00');
      console.log(newdDate)
 
      this.calendarService.gettest(findUser.id, newdDate).subscribe(data => {
        this.niveaus = data;
        console.log(this.niveaus);
      });
  


    });

   
    
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
