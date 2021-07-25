import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public API = 'https://gsa-backend.herokuapp.com/';

  private userUrl = 'https://gsa-backend.herokuapp.com/api/test/user';
  private pmUrl = 'https://gsa-backend.herokuapp.com/api/test/pm';
  private adminUrl = 'https://gsa-backend.herokuapp.com/api/test/admin';

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
