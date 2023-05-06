import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyUserService {
//https://164.132.113.57:8080
  //public API = 'https://164.132.113.57:8080/application';
  public API = 'https://164.132.113.57:8080/application';

  public company_API = this.API + '/companyusers';
   public companydelte_API = this.API+'/companyusers/';



  constructor(private http: HttpClient) {
  }


  getAll(): Observable<any> {
    return this.http.get(this.API + '/companyusers');
  }
  get(idusers: string,idcompany: string) {
    return this.http.get(this.companydelte_API+idusers+idcompany,{ responseType: 'json' });
  }

  getByUserName(username: string) {
    return this.http.get(this.companydelte_API+username,{ responseType: 'json' });
  }

  save(companyUser: any,username:any,companyid:any,password:any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(
      this.company_API+"/"+username+"/"+companyid+"/"+password,
      companyUser,
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
