import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';

import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarService } from '../../service/calendar.service';
import { CompanyService } from '../../service/company.service';
import { UserService } from '../../service/user.service';
import { FicheService } from '../../service/fiche.service';
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


    users: any;
    companyId: any;
    calendarId: any;
    userId: any;
    calender: any;
    local: any;
    date: any;
    findLocal: any;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private calendarService: CalendarService,
        private companyService: CompanyService,
        private userService: UserService,
        private ficheService: FicheService,
        private datePipe: DatePipe,
        private locauxService: LocauxService,
        public ngxSmartModalService: NgxSmartModalService,
        private translateService: TranslateService,
        private toasterService: ToasterService,) { }

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


        return Promise.all(promises).then(results => {


            this.local = results[2]
            this.users = results[0].filter(user => user.id == this.userId);
            this.calender = results[1].filter(calender => calender.id == this.calendarId);
            console.log("find user", this.users)
            console.log("find calender", this.calender)
            console.log(this.local)
        });




    }


    // ngAfterViewInit(): void {

    //     this.qrScannerComponent.getMediaDevices().then(devices => {
    //         console.log(devices);
    //         const videoDevices: MediaDeviceInfo[] = [];
    //         for (const device of devices) {
    //             if (device.kind.toString() === 'videoinput') {
    //                 videoDevices.push(device);
    //             }
    //         }
    //         if (videoDevices.length > 0) {
    //             let choosenDev;
    //             for (const dev of videoDevices) {
    //                 if (dev.label.includes('front')) {
    //                     choosenDev = dev;
    //                     break;
    //                 }
    //             }
    //             if (choosenDev) {
    //                 this.qrScannerComponent.chooseCamera.next(choosenDev);
    //             } else {
    //                 this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
    //             }
    //         }
    //     });

    //     this.qrScannerComponent.capturedQr.subscribe(result => {
    //         console.log(result);
    //         this.addScanQrCode(result);
    //     });
    // }


    onCodeResult(result: string) {

        console.log(result);
        this.addScanQrCode(result)
    }




    addScanQrCode(value) {
        console.log(value);

        let date = new Date();
 
        console.log("user id", this.userId);

        console.log("calendar   id", this.calendarId);
        console.log("date", date);

        let find = this.local.filter(local => local.name == value);
        if (find.length > 0) {
            this.findLocal = find[0].name;
        }

        console.log("find Local", this.findLocal); 

    }

}
