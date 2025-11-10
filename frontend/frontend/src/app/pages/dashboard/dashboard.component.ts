import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name: string = '';
  email: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.auth.getUserLocal();

    if (user) {
      this.name = user.name;
      this.email = user.email;
    } else {
      // Si no hay usuario logueado, redirigir al login
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.auth.logout();
    alert('Sesión cerrada correctamente.');
    this.router.navigate(['/login']);
  }
}
