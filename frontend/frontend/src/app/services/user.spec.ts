import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/api/users'; // Ajusta la URL si tu backend usa otra ruta

  constructor(private http: HttpClient) {}

  // Registrar nuevo usuario
  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // Obtener todos los usuarios
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
