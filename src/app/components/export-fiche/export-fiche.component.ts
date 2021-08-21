import { Component, OnInit } from '@angular/core';
import { FicheService } from '../../service/fiche.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeratisationService } from '../../service/deratisation.service';
import {  DesinectisationService } from '../../service/desinectisation.service';
import { jsPDF } from "jspdf";
import  autoTable   from "jspdf-autotable";

@Component({
  selector: 'app-export-fiche',
  templateUrl: './export-fiche.component.html',
  styleUrls: ['./export-fiche.component.css']
})
export class ExportFicheComponent implements OnInit  {
 
  constructor(private route: ActivatedRoute,
    private router: Router, 
    private ficheService: FicheService,
    private deratisationService: DeratisationService,
    private desinsectisationService: DesinectisationService
  ) { }
  fiches: Array<any>;
  deratisations:any;
  desinsectisations:any;
  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params['calanderid'];

      //donner table Fiche
      this.ficheService.gettest(id).subscribe(data => {
        this.fiches = data;
        console.log(this.fiches);
          //donner table deratisation
      this.deratisationService.get(this.fiches[0][0]).subscribe(data => {
        console.log("deratisation ",data);
        this.deratisations = data;
      });
      //donner table desinsectisationService 
      this.desinsectisationService.get(this.fiches[0][0]).subscribe(data => {
        console.log("desinsectisation ",data);
        this.desinsectisations = data;
      });
      }); 
    
  
    });

  }
  open(){

    const doc = new jsPDF();
    
   autoTable(doc, { html: '#my-header' });
   autoTable(doc, { html: '#my-der-title' });
   autoTable(doc, { html: '#my-der' });
   autoTable(doc, { html: '#my-des-title' });
   autoTable(doc, { html: '#my-des' });
   autoTable(doc, { html: '#my-table' });

    doc.save(this.fiches[0][9]+".pdf");

  }



}
