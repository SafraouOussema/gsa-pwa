import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToasterService, ToasterConfig, Toast, OnActionCallback, ToasterModule, BodyOutputType } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Array<any>;
  filterData: any;

  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
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
    private router: Router,
    private translateService: TranslateService,
    private toasterService: ToasterService,
    private userService: UserService,
    private authService: AuthService,
    public ngxSmartModalService: NgxSmartModalService) {

    const keys = [
      'MEMBER.MEMBERSUCCESSTITLE',
      'MEMBER.MEMBERSUCCESSBODY',
      'MEMBER.MEMBERERREURBODY'
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
    this.userService.getAll().subscribe(data => {
      this.users = data;
      this.filterData = data;
      console.log(data);
    });
  }

  search(term: string) {
    if (!term) {
      this.filterData = this.users;
    } else {
      this.filterData = this.users.filter(x =>
        x.name.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
    console.log(this.filterData);
  }


  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      this.form.address);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.toasterService.pop('success', this.successToasterTitle, this.successToasterBody);

        console.log(data);
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


  
  clear(table: Table, globalFilter) {
    globalFilter.value = null;
    table.filters.global = {
        value: null,
        matchMode: 'contains'
    }
    table.clear();
  }

}


