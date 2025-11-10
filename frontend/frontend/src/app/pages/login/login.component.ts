import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Enviando datos:', this.loginForm.value);

      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log('Respuesta del servidor:', res);

          // 🔹 Caso de login exitoso
          if (res.user) {
            this.auth.saveUserLocal(res.user);
            alert('✅ Inicio de sesión exitoso');

            // 🔹 Limpiar formulario
            this.loginForm.reset();

            // 🔹 Redirigir al dashboard
            this.router.navigate(['/dashboard']);
          } 
          // 🔹 Caso de error desde el backend (credenciales incorrectas)
          else if (res.message) {
            alert(`⚠️ ${res.message}`);
          }
        },
        error: (err: any) => {
          console.error('Error al iniciar sesión:', err);

          // 🔹 Mostrar mensaje personalizado según el código de error
          if (err.status === 401) {
            alert('❌ Credenciales inválidas. Verifica tu correo o contraseña.');
          } else {
            alert('⚠️ Error en el servidor. Inténtalo más tarde.');
          }

          // 🔹 Limpiar campos de contraseña al fallar
          this.loginForm.patchValue({ password: '' });
        }
      });
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }
}
