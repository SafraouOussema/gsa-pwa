import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {



  public API = 'http://164.132.113.57:8080/application';

  public company_API = this.API + '/produits';
  public companydelte_API = this.API+'/produits/';



  constructor(private http: HttpClient) {
  }


  getAll(): Observable<any> {
    return this.http.get(this.API + '/produits');
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
