export class fiche {


    nresponsable: string;
    incerticide: string;
    nencadreur: string;
    observations: string;

    harrive: string;
    hdepart: string;

    deratisation? : any ;
    desinsectisation? : any ;

    user : any ;
    calendar : any ;

  constructor( nresponsable: string, incerticide: string, nencadreur: string,
              observations: string, harrive: string, hdepart: string ,deratisation:any ,desinsectisation :any , user :any, calendar :any  )
  {
    this.nresponsable= nresponsable;
    this.incerticide=incerticide;
    this.nencadreur=nencadreur;
    this.observations= observations;
    this.harrive= harrive;
    this.hdepart= hdepart;
    this.deratisation = deratisation ;
    this.desinsectisation = desinsectisation ;
    this.user = user  ;
    this.calendar = calendar  ;
  }
}
