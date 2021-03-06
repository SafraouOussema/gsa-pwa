import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

//https://gsa-backend.herokuapp.com/application
  //public API = 'https://gsa-backend.herokuapp.com/application';
  public API = 'https://gsa-backend.herokuapp.com/application';
 
  public company_API = this.API + '/companys';
   public companydelte_API = this.API+'/companys/';



  constructor(private http: HttpClient) {
  }


  getAll(): Observable<any> {
    return this.http.get(this.API + '/companys');
  }
  get(id: string) {
    return this.http.get(this.companydelte_API+id,{ responseType: 'json' });
  }

  save(niv: any): Observable<any> {
    let result: Observable<Object>;

    result = this.http.post(
      this.company_API,
      niv,
      {headers :
          {
            'Content-Type': 'application/json'
          }
      }
    );

    return result;

  }


  update(prof: any): Observable<any> {
    let result: Observable<Object>;

    result = this.http.post(this.company_API, prof);

    return result;
  }



  remove(del:any): Observable<any> {

    let result: Observable<Object>;
     result = this.http.delete(this.companydelte_API+del);
     return result;
  }


}
