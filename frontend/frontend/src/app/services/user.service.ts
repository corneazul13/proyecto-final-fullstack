import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 private apiUrl = 'http://127.0.0.1:3000';


  constructor(private http: HttpClient) {}

 register(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register`, data);
}


  login(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, data);
}

}
