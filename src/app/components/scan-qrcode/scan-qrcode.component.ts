import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from '../../service/calendar.service';
import { CompanyService } from '../../service/company.service';
import { UserService } from '../../service/user.service';
import { FicheService } from '../../service/fiche.service';
import { ScanedCodeService } from '../../service/scaned-code.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { DatePipe } from '@angular/common';
import { LocauxService } from '../../service/locaux.service';
import { calendar } from '../calendar/calendar';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToasterService, ToasterConfig, Toast, OnActionCallback, ToasterModule, BodyOutputType } from 'angular2-toaster';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';





@Component({
    selector: 'app-scan-qrcode',
    templateUrl: './scan-qrcode.component.html',
    styleUrls: ['./scan-qrcode.component.css']
})
export class ScanQrcodeComponent implements OnInit {
    @ViewChild(QrScannerComponent, { static: false }) qrScannerComponent: QrScannerComponent;

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

    users: any;
    companyId: any;
    calendarId: any;
    userId: any;
    calender: any;
    local: any;
    date: any;
    findLocal: any;
    scanCodeList: any;


    isSignedUp = false;
    isSignUpFailed = false;
    errorMessage = '';
    canScan: boolean = false;
    

    constructor(private router: Router,
        private route: ActivatedRoute,
        private calendarService: CalendarService,
        private companyService: CompanyService,
        private userService: UserService,
        private ficheService: FicheService,
        private datePipe: DatePipe,
        private locauxService: LocauxService,
        private scanedCodeService: ScanedCodeService,
        public ngxSmartModalService: NgxSmartModalService,
        private translateService: TranslateService,
        private toasterService: ToasterService,) {

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

    ngOnInit(): void {

        this.loadData()

    }


    loadData() {
        this.route.params.subscribe(params => {
            this.companyId = params['companyid'];
            this.userId = params['userid'];
            this.calendarId = params['calanderid'];

        });

        let promises: Promise<any>[] = [];


        promises.push(this.userService.getAll().toPromise());
        promises.push(this.calendarService.getAll().toPromise());
        promises.push(this.locauxService.get(this.companyId).toPromise());
        promises.push(this.scanedCodeService.getScanedCodeByCalanderId(this.calendarId).toPromise())


        return Promise.all(promises).then(results => {

            console.log("find user", results)
            this.local = results[2]
            this.users = results[0].filter(user => user.id == this.userId);
            this.calender = results[1].filter(calender => calender.id == this.calendarId);
            this.scanCodeList = results[3];
            console.log("find user", this.users)
            console.log("find calender", this.calender)
            console.log(this.local)
        });




    }



    openScan() {
        this.canScan = true;
    }

    onCodeResult(result: string) {

        console.log(result);
        this.addScanQrCode(result)
    }




    addScanQrCode(value) {
        console.log(value);
        let findLocalId: number
        let date = new Date();
        let find = this.local.filter(local => local.name == value);
        if (find.length > 0) {
            this.findLocal = find[0].name;
            findLocalId = find[0].id;
        }
        let data = {
            date: this.datePipe.transform(date, ("yyyy-MM-dd")),
            time: this.datePipe.transform(date, ("shortTime"))
        }


        let scendDate = new Date(data.date + " " + data.time)

 

        let ifExist = this.scanCodeList.filter(sc => sc.calendar.id == this.calendarId && sc.locaux.id == findLocalId);
        console.log(ifExist)
        if (ifExist.length ==1) {
            let minutes = 1000 * 60;
            let firstDate = new Date(ifExist[0].date + " " + ifExist[0].time)

            console.log(firstDate)

            let test = scendDate.getTime() - firstDate.getTime();


            let def = Math.round(test / minutes)

            console.log(Math.round(test / minutes))
            if (def > 2) {
                this.addScanCode(data,findLocalId);
            } else {
                 this.toasterService.pop('error',  "Il faut attendre 2 min" );

            }

        }
        else if (ifExist.length == 0){
            this.addScanCode(data,findLocalId);
        }
 
        this.canScan = false;
    }
 
    addScanCode(data,findLocalId){
        this.scanedCodeService.save(data, this.userId, this.calendarId, findLocalId).subscribe(
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

}
 