import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanedCodeService {

  public API = 'https://164.132.113.57:8080/application';

  public calendars_API = this.API + '/scanedCode/';
  public calendarsd_API = this.API + '/scanedCode/';
  public calendarsdate_API =  this.API + '/scanedCodecalanderid/';

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<any> {
    return this.http.get(this.API + '/scanedCode');
  }

  getScanedCodeByCalanderId(id: any): Observable<any> {
    return this.http.get(this.calendarsdate_API+id);
  }


  save(niv: any, userid: any, calendarId: any,localId:any): Observable<any> {
    let result: Observable<Object>;
    result = this.http.post(
      this.calendarsd_API + userid + "/" + calendarId+"/"+localId,
      niv,
      {
        headers:
          {
            'Content-Type': 'application/json'
          }
      }
    );

    return result;
  }


  remove(delniv: any): Observable<any> {
    let result: Observable<Object>;

    result = this.http.delete(this.calendarsd_API + delniv);

    return result;
  }


}
