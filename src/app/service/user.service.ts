import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public API = 'http://164.132.113.57:8080/';

  private userUrl = 'http://164.132.113.57:8080/api/test/user';
  private pmUrl = 'http://164.132.113.57:8080/api/test/pm';
  private adminUrl = 'http://164.132.113.57:8080/api/test/admin';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }

  getAll(): Observable<any> {
    return this.http.get(this.API +'users');
  }


}
