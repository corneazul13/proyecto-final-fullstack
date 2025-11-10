import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) {}

  // 🔹 Registro de usuario
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // 🔹 Login de usuario
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // 🔹 Guardar usuario localmente
  saveUserLocal(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // 🔹 Obtener usuario local
  getUserLocal() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // 🔹 Eliminar usuario local (logout)
  logout() {
    localStorage.removeItem('user');
  }
}
