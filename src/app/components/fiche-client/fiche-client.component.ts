import { Component, OnInit } from '@angular/core';
import { FicheService } from '../../service/fiche.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeratisationService } from '../../service/deratisation.service';
import { DesinectisationService } from '../../service/desinectisation.service';
import { ScanedCodeService } from '../../service/scaned-code.service';

import { DatePipe } from '@angular/common';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
@Component({
  selector: 'app-fiche-client',
  templateUrl: './fiche-client.component.html',
  styleUrls: ['./fiche-client.component.css']
})
export class FicheClientComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private ficheService: FicheService,
    private scanedCodeService: ScanedCodeService,
    private deratisationService: DeratisationService,
    private desinsectisationService: DesinectisationService
  ) { }


  fiches: Array<any>;
  deratisations: any;
  desinsectisations: any;
  dateList = [];


  ngOnInit() {
    this.dateList = [];

    this.route.params.subscribe(params => {
      let promises: Promise<any>[] = [];
      const id = params['calanderid'];

      this.ficheService.gettest(id).toPromise().then(res => {
        this.fiches = res[0];
        promises.push(this.deratisationService.get(this.fiches[0]).toPromise())
        promises.push(this.desinsectisationService.get(this.fiches[0]).toPromise())
        promises.push(this.scanedCodeService.getScanedCodeByCalanderId(id).toPromise())


        return Promise.all(promises).then(results => {
          this.deratisations = results[0];
          this.desinsectisations = results[1];

          results[2].forEach(element => {

            let firstDate = new Date(element.date + " " + element.time)
            firstDate.getTime();
            let createDate = {
              id: element.locaux.id,
              date: firstDate,
              time: firstDate.getTime()
            }
            this.dateList.push(createDate);
          });
          this.dateList.sort((a, b) => (a.color > b.color) ? 1 : -1)

        });
      });

    });

  }

  findLocal(local, type) {

    let listDate = this.dateList;
    listDate = listDate.filter(ld => ld.id == local.locaux.id);

    if (type == "arrivee") {
      let harrive = this.datePipe.transform(listDate[listDate.length - 1].date, ("shortTime"));
      return harrive;
    } else {

      let hdepart = this.datePipe.transform(listDate[0].date, ("shortTime"));
      return hdepart;
    }

  }




  open() {

    const doc = new jsPDF();

    autoTable(doc, { html: '#my-header' });
    autoTable(doc, { html: '#my-der-title' });
    autoTable(doc, { html: '#my-der' });
    autoTable(doc, { html: '#my-des-title' });
    autoTable(doc, { html: '#my-des' });
    autoTable(doc, { html: '#my-table' });
    autoTable(doc, { html: '#my-signe', styles: { halign: 'center', valign: "middle", cellWidth: 50 }, bodyStyles: { cellWidth: 60, minCellWidth: 60, minCellHeight: 30 } });

    doc.save(this.fiches[9] + ".pdf");

  }



}
