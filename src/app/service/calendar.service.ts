import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {


  public API = 'https://gsa-backend.herokuapp.com/application';

  public calendars_API = this.API + '/calendars';
  public calendarsd_API = this.API + '/calendars/';

  public calendarsdate_API = this.API + '/calendarsdate/';

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<any> {
    return this.http.get(this.API + '/calendars');
  }
 
  gettest(id: any,date: Date): Observable<any> {
    return this.http.get(this.calendarsdate_API+id+"/"+date);
  }



  save(niv: any,userid:any,companyid:any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(
      this.calendarsd_API+userid+"/"+companyid,
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

    result = this.http.post(this.calendars_API, prof);

    return result;
  }



  remove(delniv: any): Observable<any> {
    let result: Observable<Object>;

    result = this.http.delete(this.calendarsd_API+delniv);

    return result;
  }



}
