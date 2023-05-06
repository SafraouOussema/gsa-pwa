export class deratisation {

    acceder: boolean;
    n_post: number;
    appats_touches:boolean;
    appats_non_touches:boolean;
    appats_abscents:boolean;
    poste_abscente:boolean;

    constructor(acceder: boolean,n_post:number,appats_touches:boolean,appats_non_touches:boolean,appats_abscents:boolean,poste_abscente:boolean) {
      this.acceder = acceder;
      this.n_post = n_post;

      this.appats_touches = appats_touches;
      this.appats_non_touches = appats_non_touches;
      this.appats_abscents = appats_abscents;
      this.poste_abscente = poste_abscente;

    }
  }
